/** Automatically generated code, please do not modify. */
const _LocalContext = require('../../../lib/neblocal.js').LocalContext
const _LocalBase = require('../../../lib/test_local_base.js')
const Bidding = require('../../../src/Bidding/main')


class _Local extends _LocalBase {

    get __contractClass() {
        return Bidding
    }

    _deploy(multiSigAddress) {
        try {
            return _LocalContext._deploy(this._account, Bidding, [multiSigAddress])
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

    pledge() {
        return this._call(Bidding, 'pledge', this._value, Array.from(arguments))
    }

    cancelPledge() {
        return this._call(Bidding, 'cancelPledge', this._value, Array.from(arguments))
    }

    getAddressIndexes() {
        return this._call(Bidding, 'getAddressIndexes', this._value, Array.from(arguments))
    }

    getAddresses(index) {
        return this._call(Bidding, 'getAddresses', this._value, [index])
    }

    getCurrentPledge(address) {
        return this._call(Bidding, 'getCurrentPledge', this._value, [address])
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
