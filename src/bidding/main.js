/** Local simulation environment code; Do not modify */
const neblocal = require('../../lib/neblocal')
const crypto = require('../../lib/crypto')
const BigNumber = require('bignumber.js')
const Blockchain = neblocal.Blockchain
const LocalContractStorage = neblocal.LocalContractStorage
const Event = neblocal.Event
/** Local simulation environment code; End. */

function PledgeDataList(storage, key) {
    this._storage = storage;
    this._key = key;
    this._pageIndexes = null;
    this._pageSize = 1000;
}

PledgeDataList.prototype = {

    _indexesKey: function() {
        return "pis_" + this._key;
    },

    _dataKey: function(index) {
        return "pd_" + this._key + "_" + index;
    },

    _lastIndex: function() {
        let indexes = this.getPageIndexes();
        if (indexes.length > 0) {
            return indexes[indexes.length - 1];
        }
        return null;
    },

    _addIndex: function(index) {
        this.getPageIndexes().push(index);
        this._saveIndexes();
    },

    _saveIndexes: function() {
        this._storage.put(this._indexesKey(), this.getPageIndexes());
    },

    _savePageData: function(index, data) {
        this._storage.put(this._dataKey(index), data);
    },

    getPageIndexes: function() {
        if (!this._pageIndexes) {
            this._pageIndexes = this._storage.get(this._indexesKey());
        }
        if (!this._pageIndexes) {
            this._pageIndexes = [];
        }
        return this._pageIndexes;
    },

    getPageData: function(index) {
        let r = this._storage.get(this._dataKey(index));
        if (!r) {
            r = [];
        }
        return r;
    },

    addAll: function(data) {
        let indexes = this.getPageIndexes();
        let tempPageData = null;
        for (let i = 0; i < data.length; ++i) {
            let obj = data[i];
            let p = null;
            for (let i = 0; i < indexes.length; ++i) {
                let index = indexes[i];
                if (index.l < this._pageSize) {
                    p = index;
                    break;
                }
            }
            if (p == null) {
                let i = 0;
                if (indexes.length > 0) {
                    i = indexes[indexes.length - 1].i + 1;
                }
                p = {
                    i: i,
                    l: 0
                };
                indexes.push(p);
            }

            if (tempPageData != null && tempPageData.index !== p.i) {
                this._storage.put(this._dataKey(tempPageData.index), tempPageData.data);
                tempPageData = null;
            }
            if (!tempPageData) {
                tempPageData = {
                    index: p.i,
                    data: this.getPageData(p.i)
                };
            }
            let d = tempPageData.data;
            d.push(obj);
            p.l += 1;
        }
        if (tempPageData) {
            this._storage.put(this._dataKey(tempPageData.index), tempPageData.data);
        }
        this._saveIndexes();
    },

    add: function(obj) {
        let indexes = this.getPageIndexes();
        let p = null;
        for (let i = 0; i < indexes.length; ++i) {
            let index = indexes[i];
            if (index.l < this._pageSize) {
                p = index;
                break;
            }
        }

        if (p == null) {
            let i = 0;
            if (indexes.length > 0) {
                i = indexes[indexes.length - 1].i + 1;
            }
            p = {
                i: i,
                l: 0
            };
            this._addIndex(p);
        }

        let d = this.getPageData(p.i);
        d.push(obj);
        p.l += 1;
        this._saveIndexes();
        this._storage.put(this._dataKey(p.i), d);
    },

    del: function(ele) {
        let indexes = this.getPageIndexes();
        if (indexes) {
            for (let i = 0; i < indexes.length; ++i) {
                let index = indexes[i];
                let ds = this.getPageData(index.i);
                if (ds) {
                    for (let j = 0; j < ds.length; ++j) {
                        if (ele === ds[j]) {
                            ds.splice(j, 1);
                            index.l -= 1;
                            this._storage.put(this._dataKey(index.i), ds);
                            this._storage.put(this._indexesKey(), indexes);
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    },

    delAll: function(eles) {
        let indexes = this.getPageIndexes();
        if (indexes.length === 0) {
            return;
        }
        let cachePages = {};
        for (let k = 0; k < eles.length; ++k) {
            let ele = eles[k];
            for (let i = 0; i < indexes.length; ++i) {
                let index = indexes[i];
                let strIndex = "" + index.i;
                let p = cachePages[strIndex];
                if (!p) {
                    p = {
                        changed: false,
                        data: this.getPageData(index.i)
                    };
                    cachePages[strIndex] = p;
                }
                let newData = [];
                for (let j = 0; j < p.data.length; ++j) {
                    if (ele !== p.data[j]) {
                        newData.push(p.data[j]);
                    }
                }
                if (newData.length !== p.data.length) {
                    p.changed = true;
                    p.data = newData;
                }
            }
        }
        for (let index in cachePages) {
            let p = cachePages[index];
            if (p.changed) {
                this._savePageData(index, p.data);
            }
        }
        this._saveIndexes();
    }
};


function CurrentData(storage) {
    this._storage = storage;
    this._addressList = new PledgeDataList(storage, "address_list");
}

CurrentData.prototype = {

    _getPledge: function(address) {
        let r = this._storage.get(address);
        if (!r) {
            r = "0";
        }
        return r;
    },

    addPledge: function(address, pledge) {
        let p = this._getPledge(address);
        if (p === "0") {
            this._addressList.add(address);
        }
        p = BigNumber(p).add(BigNumber(pledge)).toString(10);
        this._storage.put(address, p);
    },

    cancelPledge: function(address) {
        let p = this._getPledge(address);
        if (p === "0") {
            throw ("No pledges that can be cancelled.");
        }
        this._addressList.del(address);
        this._storage.del(address);
        return p;
    },

    getCurrentPledge: function(address) {
        let r = this._storage.get(address);
        if (!r) {
            r = "0";
        }
        return r;
    }
};


function Bidding() {
    this.__contractName = "Bidding";
    LocalContractStorage.defineProperties(this, {
        _config: null,
    });
    LocalContractStorage.defineMapProperties(this, {
        "_current": null,
    });

    this._currentData = new CurrentData(this._current);

    this._unit = new BigNumber(10).pow(18);
}

Bidding.prototype = {

    init: function(multiSigAddress) {
        this._verifyAddress(multiSigAddress);
        this._config = {
            multiSig: multiSigAddress
        };
    },

    _verifyAddress: function(address) {
        if (Blockchain.verifyAddress(address) === 0) {
            throw ("Address error");
        }
    },

    _verifyFromMultisig: function() {
        if (this._config.multiSig !== Blockchain.transaction.from) {
            throw ("Permission Denied!");
        }
    },

    getConfig: function() {
        return this._config;
    },

    setConfig: function(config) {
        this._verifyFromMultisig();
        this._config = {
            multiSig: config.multiSig,
            NAX: config.NAX
        };
    },

    pledge: function() {
        let value = Blockchain.transaction.value;
        let address = Blockchain.transaction.from;

        let v = new BigNumber(value);
        if (new BigNumber(5).mul(this._unit).gt(v)) {
            throw ("The amount cannot be less than 5 NAS");
        }
        v = v.div(this._unit).toString(10);
        this._currentData.addPledge(address, v);

        Event.Trigger("pledgeRedirect", {
            Transfer: {
                from: address,
                to: Blockchain.transaction.to,
                value: value,
            }
        });
    },

    cancelPledge: function() {
        let address = Blockchain.transaction.from;
        let v = this._currentData.cancelPledge(address);
        let value = new BigNumber(v).mul(this._unit);

        let r = Blockchain.transfer(address, value);
        if (r) {
            Event.Trigger("cancelPledge", {
                Transfer: {
                    from: Blockchain.transaction.to,
                    to: Blockchain.transaction.from,
                    value: value
                }
            });
        }
    },

    getAddressIndexes: function() {
        return this._currentData._addressList.getPageIndexes();
    },

    getAddresses: function(index) {
        return this._currentData._addressList.getPageData(index);
    },

    getCurrentPledge: function(address) {
        return this._currentData.getCurrentPledge(address);
    },

    getPledges: function() {
        let result = new Object();
        let indexes = this.getAddressIndexes();
        for (let i = 0; i < indexes.length; ++i) {
            let index = indexes[i];
            let addrs = this.getAddresses(index.i);
            for (let j = 0; j < addrs.length; ++j) {
                let addr = addrs[j];
                let p = this.getCurrentPledge(addr);
                result[addr] = p;
            }
        }
        return result;
    },

    distribute: function() {
        this._verifyFromMultisig();
        let ps = this.getPledges();
        tot = BigNumber(0);
        for (var addr in ps) {
            let value = BigNumber(ps[addr]);
            tot = tot.add(value);
        }
        let NAXContract = new Blockchain.Contract(this._config.NAX);
        for (var addr in ps) {
            let value = BigNumber(ps[addr]);
            let nax = value.div(tot).mul(3000000);
            nax = nax.mul(BigNumber(10).pow(9)).floor().toString(10);
            //console.log("transfer nax "+nax+" to "+addr);
            NAXContract.call("transfer", addr, nax);

            if (tot > 20000) {
                let returnNAS = value.sub(value.div(tot).mul(20000));
                returnNAS = returnNAS.mul(this._unit).floor().toString(10);
                let r = Blockchain.transfer(addr, returnNAS);
                if (r) {
                    Event.Trigger("returnNAS", {
                        Transfer: {
                            from: Blockchain.transaction.to,
                            to: addr,
                            value: returnNAS
                        }
                    });
                }
            }
        }
    },

    transferFund: function(addr,value) {
        this._verifyFromMultisig();
        this._verifyAddress(addr);
        let r = Blockchain.transfer(addr, value);
        if (r) {
            Event.Trigger("transferFund", {
                Transfer: {
                    from: Blockchain.transaction.to,
                    to: addr,
                    value: value
                }
            });
        } else {
            throw ("Transfer Amount failed");
        }
        return r;
    },

};

module.exports = Bidding;
