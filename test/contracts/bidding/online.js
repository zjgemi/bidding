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

    async _deployTest(multiSigAddress) {
        try {
            return this._testResult(await this.nebUtil.deployTest(this._account.getAddressString(), this._source, [multiSigAddress]))
        } finally {
            this._reset()
        }
    }
    
    async _deploy(multiSigAddress) {
        try {
            return await this._getDeployResult('Bidding', await this.nebUtil.oneKeyDeploy(this._account, this._source, [multiSigAddress]))
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

    async pledgeTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'pledge', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async pledge() {
        try {
            return await this._getTxResult('Bidding.pledge', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'pledge', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async cancelPledgeTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'cancelPledge', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async cancelPledge() {
        try {
            return await this._getTxResult('Bidding.cancelPledge', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'cancelPledge', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async getAddressIndexesTest() {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getAddressIndexes', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async getAddressIndexes() {
        try {
            return await this._getTxResult('Bidding.getAddressIndexes', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getAddressIndexes', Array.from(arguments)))
        } finally {
            this._reset()
        }
    }

    async getAddressesTest(index) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getAddresses', [index]))
        } finally {
            this._reset()
        }
    }

    async getAddresses(index) {
        try {
            return await this._getTxResult('Bidding.getAddresses', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getAddresses', [index]))
        } finally {
            this._reset()
        }
    }

    async getCurrentPledgeTest(address) {
        try {
            return this._testResult(await this.nebUtil.callTest(this._account.getAddressString(), this._contractAddress, this._value, 'getCurrentPledge', [address]))
        } finally {
            this._reset()
        }
    }

    async getCurrentPledge(address) {
        try {
            return await this._getTxResult('Bidding.getCurrentPledge', await this.nebUtil.oneKeyCall(this._account, this._contractAddress, this._value, 'getCurrentPledge', [address]))
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
