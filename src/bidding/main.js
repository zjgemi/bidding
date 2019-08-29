/** Local simulation environment code; Do not modify */
const neblocal = require('../../lib/neblocal')
const crypto = require('../../lib/crypto')
const BigNumber = require('bignumber.js')
const Blockchain = neblocal.Blockchain
const LocalContractStorage = neblocal.LocalContractStorage
const Event = neblocal.Event
/** Local simulation environment code; End. */

function CurrentData(storage) {
    this._storage = storage;
}

CurrentData.prototype = {

    _getPledge: function(address) {
        let r = this._storage.get(address);
        if (!r) {
            r = "0";
        }
        return r;
    },

    _getAddressList: function() {
        let r = this._storage.get("address_list");
        if (!r) {
            r = [];
        }
        return r;
    },

    _getTotal: function() {
        let r = this._storage.get("total");
        if (!r) {
            r = "0";
        }
        return r;
    },

    addPledge: function(address, pledge) {
        let p = this._getPledge(address);
        if (p === "0") {
            let r = this._getAddressList();
            r.push(address);
            this._storage.put("address_list", r);
        }
        p = BigNumber(p).add(BigNumber(pledge)).toString(10);
        this._storage.put(address, p);

        let tot = this._getTotal();
        tot = BigNumber(tot).add(BigNumber(pledge)).toString(10);
        this._storage.put("total", tot);
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

    init: function(multiSigAddress,startHeight,endHeight) {
        this._verifyAddress(multiSigAddress);
        this._config = {
            multiSig: multiSigAddress,
            startHeight: startHeight,
            endHeight: endHeight
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
            NAX: config.NAX,
            startHeight: config.startHeight,
            endHeight: config.endHeight
        };
    },

    accept: function() {
        let value = Blockchain.transaction.value;
        let address = Blockchain.transaction.from;
        let height = Blockchain.block.height;

        if (height < this._config.startHeight) {
            throw ("The bidding has not started yet");
        }

        if (height > this._config.endHeight) {
            throw ("The bidding has finished");
        }

        if (BigNumber(5).mul(this._unit).gt(BigNumber(value))) {
            throw ("The amount cannot be less than 5 NAS");
        }
        this._currentData.addPledge(address, value);

        Event.Trigger("pledgeRedirect", {
            Transfer: {
                from: address,
                to: Blockchain.transaction.to,
                value: value,
            }
        });
    },

    getAddressList: function() {
        return this._currentData._getAddressList();
    },

    getPledge: function(address) {
        return this._currentData._getPledge(address);
    },

    getTotal: function() {
        return this._currentData._getTotal();
    },

    getPledges: function() {
        let result = [];
        let addrs = this.getAddressList();
        for (let i = 0; i < addrs.length; ++i) {
            let addr = addrs[i];
            let p = this.getPledge(addr);
            result.push({"address": addr, "value": p})
        }
        return result;
    },

    distribute: function() {
        this._verifyFromMultisig();
        let height = Blockchain.block.height;
        if (height <= this._config.endHeight) {
            throw ("The bidding has not finished yet");
        }
        tot = BigNumber(this.getTotal());
        let NAXContract = new Blockchain.Contract(this._config.NAX);
        let addrs = this.getAddressList();
        for (let i = 0; i < addrs.length; ++i) {
            let addr = addrs[i];
            let value = BigNumber(this.getPledge(addr));
            let nax = value.div(tot).mul(3000000);
            nax = nax.mul(BigNumber(10).pow(9)).floor().toString(10);
            //console.log("transfer "+nax+" NAX to "+addr);
            NAXContract.call("transfer", addr, nax);

            if (tot.gt(BigNumber(20000).mul(this._unit))) {
                let returnNAS = value.sub(value.div(tot).mul(20000).mul(this._unit));
                returnNAS = returnNAS.floor().toString(10);
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
