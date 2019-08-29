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
    LocalContext.blockHeight = 20
    LocalContext.transfer(null, TestKeys.otherKeys[0].getAddressString(), BigNumber(12000.1).mul(BigNumber(10).pow(18)))
    LocalContext.transfer(null, TestKeys.otherKeys[1].getAddressString(), BigNumber(80000).mul(BigNumber(10).pow(18)))
    LocalContext.transfer(null, TestKeys.otherKeys[2].getAddressString(), BigNumber(9200).mul(BigNumber(10).pow(18)))

    Bidding._deploy(TestKeys.caller.getAddressString(),10,30)
    Bidding.setConfig({"multiSig": TestKeys.caller.getAddressString(),"NAX": "n1wdr57GeDF65SDzN9ZyXkkvJ2tmMGhMkuR","startHeight": 10, "endHeight": 30})
    console.log(Bidding.getConfig())

    LocalContext.transfer(TestKeys.otherKeys[0].getAddressString(), LocalContext.getContractAddress(Bidding), BigNumber(7000.1).mul(BigNumber(10).pow(18)))
    LocalContext.transfer(TestKeys.otherKeys[1].getAddressString(), LocalContext.getContractAddress(Bidding), BigNumber(80000).mul(BigNumber(10).pow(18)))
    LocalContext.transfer(TestKeys.otherKeys[2].getAddressString(), LocalContext.getContractAddress(Bidding), BigNumber(9200).mul(BigNumber(10).pow(18)))

    res = Bidding.getPledges()
    for (let i = 0; i < res.length; ++i) {
        console.log("Addr"+i+" pledge:"+BigNumber(res[i].value).div(BigNumber(10).pow(18)))
    }
    tot = Bidding.getTotal()
    console.log("Total pledge:"+BigNumber(tot).div(BigNumber(10).pow(18)))

    LocalContext.transfer(TestKeys.otherKeys[0].getAddressString(), LocalContext.getContractAddress(Bidding), BigNumber(5000).mul(BigNumber(10).pow(18)))
    
    res = Bidding.getPledges()
    for (let i = 0; i < res.length; ++i) {
        console.log("Addr"+i+" pledge:"+BigNumber(res[i].value).div(BigNumber(10).pow(18)))
    }
    tot = Bidding.getTotal()
    console.log("Total pledge:"+BigNumber(tot).div(BigNumber(10).pow(18)))

    console.log("Contract balance: "+LocalContext.getBalance(LocalContext.getContractAddress(Bidding)).div(BigNumber(10).pow(18)).toString(10))
    console.log("Addr0 balance: "+LocalContext.getBalance(TestKeys.otherKeys[0].getAddressString()).div(BigNumber(10).pow(18)).toString(10))
    console.log("Addr1 balance: "+LocalContext.getBalance(TestKeys.otherKeys[1].getAddressString()).div(BigNumber(10).pow(18)).toString(10))
    console.log("Addr2 balance: "+LocalContext.getBalance(TestKeys.otherKeys[2].getAddressString()).div(BigNumber(10).pow(18)).toString(10))

    LocalContext.blockHeight = 40
    Bidding.distribute()
    console.log("Contract balance: "+LocalContext.getBalance(LocalContext.getContractAddress(Bidding)).div(BigNumber(10).pow(18)).toString(10))
    console.log("Addr0 balance: "+LocalContext.getBalance(TestKeys.otherKeys[0].getAddressString()).div(BigNumber(10).pow(18)).toString(10))
    console.log("Addr1 balance: "+LocalContext.getBalance(TestKeys.otherKeys[1].getAddressString()).div(BigNumber(10).pow(18)).toString(10))
    console.log("Addr2 balance: "+LocalContext.getBalance(TestKeys.otherKeys[2].getAddressString()).div(BigNumber(10).pow(18)).toString(10))

    Bidding.transferFund(TestKeys.otherKeys[3].getAddressString(),BigNumber(10).pow(18).mul(20000).toString(10))
    console.log("Contract balance: "+LocalContext.getBalance(LocalContext.getContractAddress(Bidding)).div(BigNumber(10).pow(18)).toString(10))
    console.log("Addr3 balance: "+LocalContext.getBalance(TestKeys.otherKeys[3].getAddressString()).div(BigNumber(10).pow(18)).toString(10))

    LocalContext.transfer(TestKeys.otherKeys[0].getAddressString(), LocalContext.getContractAddress(Bidding), BigNumber(5000).mul(BigNumber(10).pow(18)))

}

main()
