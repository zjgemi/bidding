/** Automatically generated code, please do not modify. */
const Bidding = require('./contracts/Bidding/online.js').testnet
const BiddingMainnet = require('./contracts/Bidding/online.js').mainnet
/** Automatically generated code; End. */

const TestKeys = require('../lib/test_keys.js')
const ConfigRunner = require('../lib/config_runner.js')
const ConfigManager = require('../lib/config_manager.js')
const NebUtil = require('../lib/neb_util.js')


async function main() {
    console.log('deploy begin...')
    await Bidding._deploy("n1UiVK8ZPsJ44QNTtHTP4z2MLWbN3DqahRF",2394240,2394280)
    await console.log(Bidding.getConfig())
}

main()
