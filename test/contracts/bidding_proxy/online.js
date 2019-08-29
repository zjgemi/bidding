/** Automatically generated code, please do not modify. */
const fs = require('fs')
const path = require('path')
const OnlineBase = require('../../../lib/test_online_base.js')
const NebUtil = require('../../../lib/neb_util.js')


class Online extends OnlineBase {

    constructor(isMainnet) {
        super(isMainnet)
        this.nebUtil = isMainnet ? NebUtil.mainnet : NebUtil.testnet
    }

    get __contractName() {
        return 'bidding_proxy'
    }

    get _source() {
        let p = path.join(__dirname, '../../../build/output/bidding_proxy.js')
        if (!fs.existsSync(p)) {
            throw p + ' not found.'
        }
        return String(fs.readFileSync(p))
    }

    async _deployTest() {
        try {
            return this._testResult(await this.nebUtil.deployTest(this._account.getAddressString(), this._source, Array.from(arguments)))
        } finally {
            this._reset()
        }
    }
    
    async _deploy() {
        try {
            return await this._getDeployResult('bidding_proxy', await this.nebUtil.oneKeyDeploy(this._account, this._source, Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

}


Online.mainnet = new Online(true)
Online.testnet = new Online(false)


module.exports = Online
