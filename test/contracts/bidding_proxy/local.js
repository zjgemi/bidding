/** Automatically generated code, please do not modify. */
const _LocalContext = require('../../../lib/neblocal.js').LocalContext
const _LocalBase = require('../../../lib/test_local_base.js')
const bidding_proxy = require('../../../src/bidding_proxy/main')


class _Local extends _LocalBase {

    get __contractClass() {
        return bidding_proxy
    }

    _deploy() {
        try {
            return _LocalContext._deploy(this._account, bidding_proxy, Array.from(arguments))
        } finally {
            this._reset()
        }
    }

}


module.exports = new _Local()
