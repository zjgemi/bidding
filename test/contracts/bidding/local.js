/** Automatically generated code, please do not modify. */
const _LocalContext = require('../../../lib/neblocal.js').LocalContext
const _LocalBase = require('../../../lib/test_local_base.js')
const Bidding = require('../../../src/Bidding/main')


class _Local extends _LocalBase {

    get __contractClass() {
        return Bidding
    }

    _deploy(multiSigAddress, startHeight, endHeight) {
        try {
            return _LocalContext._deploy(this._account, Bidding, [multiSigAddress, startHeight, endHeight])
        } finally {
            this._reset()
        }
    }

    getConfig() {
        return this._call(Bidding, 'getConfig', this._value, Array.from(arguments))
    }

    setConfig(config) {
        return this._call(Bidding, 'setConfig', this._value, [config])
    }

    getAddressList() {
        return this._call(Bidding, 'getAddressList', this._value, Array.from(arguments))
    }

    getPledge(address) {
        return this._call(Bidding, 'getPledge', this._value, [address])
    }

    getTotal() {
        return this._call(Bidding, 'getTotal', this._value, Array.from(arguments))
    }

    getPledges() {
        return this._call(Bidding, 'getPledges', this._value, Array.from(arguments))
    }

    distribute() {
        return this._call(Bidding, 'distribute', this._value, Array.from(arguments))
    }

    transferFund(addr, value) {
        return this._call(Bidding, 'transferFund', this._value, [addr, value])
    }

}


module.exports = new _Local()
