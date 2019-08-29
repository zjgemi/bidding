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
        return 'Bidding'
    }

    get _source() {
        let p = path.join(__dirname, '../../../build/output/Bidding.js')
        if (!fs.existsSync(p)) {
            throw p + ' not found.'
        }
        return String(fs.readFileSync(p))
    }

    async _deployTest(multiSigAddress, startHeight, endHeight) {
        try {
            return this._testResult(await this.nebUtil.deployTest(this._account.getAddressString(), this._source, [multiSigAddress, startHeight, endHeight]))
        } finally {
            this._reset()
        }
    }
    
    async _deploy(multiSigAddress, startHeight, endHeight) {
        try {
            return await this._getDeployResult('Bidding', await this.nebUtil.oneKeyDeploy(this._account, this._source, [multiSigAddress, startHeight, endHeight]))
        } finally {
            this._reset()
        }
    }

    async getConfigTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getConfig', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async getConfig() {
        try {
            return await this._getTxResult('Bidding.getConfig', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getConfig', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async setConfigTest(config) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'setConfig', [config]))
        } finally {
            this._reset()
        }
    }

    async setConfig(config) {
        try {
            return await this._getTxResult('Bidding.setConfig', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'setConfig', [config]))
        } finally {
            this._reset()
        }
    }

    async getAddressListTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getAddressList', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async getAddressList() {
        try {
            return await this._getTxResult('Bidding.getAddressList', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getAddressList', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async getPledgeTest(address) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getPledge', [address]))
        } finally {
            this._reset()
        }
    }

    async getPledge(address) {
        try {
            return await this._getTxResult('Bidding.getPledge', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getPledge', [address]))
        } finally {
            this._reset()
        }
    }

    async getTotalTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getTotal', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async getTotal() {
        try {
            return await this._getTxResult('Bidding.getTotal', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getTotal', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async getPledgesTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getPledges', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async getPledges() {
        try {
            return await this._getTxResult('Bidding.getPledges', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getPledges', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async distributeTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'distribute', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async distribute() {
        try {
            return await this._getTxResult('Bidding.distribute', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'distribute', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async transferFundTest(addr, value) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'transferFund', [addr, value]))
        } finally {
            this._reset()
        }
    }

    async transferFund(addr, value) {
        try {
            return await this._getTxResult('Bidding.transferFund', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'transferFund', [addr, value]))
        } finally {
            this._reset()
        }
    }

}


Online.mainnet = new Online(true)
Online.testnet = new Online(false)


module.exports = Online
