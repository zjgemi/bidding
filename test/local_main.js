/** Automatically generated code, please do not modify. */
const Bidding = require('./contracts/Bidding/local.js')
/** Automatically generated code; End. */

const TestKeys = require('../lib/test_keys.js')
const LocalContext = require('../lib/neblocal.js').LocalContext
const ConfigRunner = require('../lib/config_runner.js')
const BigNumber = require('bignumber.js')

// 清空模拟环境数据
LocalContext.clearData()


async function main() {
    Bidding._deploy(TestKeys.caller.getAddressString())
    Bidding.setConfig({"multiSig": TestKeys.caller.getAddressString(),"token": "n1wdr57GeDF65SDzN9ZyXkkvJ2tmMGhMkuR"})
    console.log(Bidding.getConfig())
    LocalContext.transfer(null, TestKeys.otherKeys[0].getAddressString(), BigNumber(12000.1).mul(BigNumber(10).pow(18)))
    LocalContext.transfer(null, TestKeys.otherKeys[1].getAddressString(), BigNumber(80000).mul(BigNumber(10).pow(18)))
    LocalContext.transfer(null, TestKeys.otherKeys[2].getAddressString(), BigNumber(9200).mul(BigNumber(10).pow(18)))
    Bidding._setAccount(TestKeys.otherKeys[0])._setValue(BigNumber(7000.1).mul(BigNumber(10).pow(18))).pledge()
    Bidding._setAccount(TestKeys.otherKeys[1])._setValue(BigNumber(80000).mul(BigNumber(10).pow(18))).pledge()
    Bidding._setAccount(TestKeys.otherKeys[2])._setValue(BigNumber(9200).mul(BigNumber(10).pow(18))).pledge()
    Bidding._setAccount(TestKeys.otherKeys[0])._setValue(BigNumber(5000).mul(BigNumber(10).pow(18))).pledge()
    
    console.log(Bidding.getPledges())

    Bidding._setAccount(TestKeys.otherKeys[1]).cancelPledge()
    console.log(Bidding.getPledges())

    Bidding.distribute()
    console.log(LocalContext.getBalance(LocalContext.getContractAddress(Bidding)).div(BigNumber(10).pow(18)).toString(10))
    console.log(LocalContext.getBalance(TestKeys.otherKeys[0].getAddressString()).div(BigNumber(10).pow(18)).toString(10))
    console.log(LocalContext.getBalance(TestKeys.otherKeys[1].getAddressString()).div(BigNumber(10).pow(18)).toString(10))
    console.log(LocalContext.getBalance(TestKeys.otherKeys[2].getAddressString()).div(BigNumber(10).pow(18)).toString(10))

    Bidding.transferFund(TestKeys.otherKeys[3].getAddressString(),BigNumber(10).pow(18).mul(20000).toString(10))
    console.log(LocalContext.getBalance(LocalContext.getContractAddress(Bidding)).div(BigNumber(10).pow(18)).toString(10))
    console.log(LocalContext.getBalance(TestKeys.otherKeys[3].getAddressString()).div(BigNumber(10).pow(18)).toString(10))

}

main()
