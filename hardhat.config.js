require('@nomiclabs/hardhat-waffle');

module.exports = {
    solidity: "0.8.1",
    networks: {
        rinkeby: {
            url: 'https://sly-intensive-sheet.rinkeby.discover.quiknode.pro/672c8b04bcdece1add6cd981c828a79fa8387340/',
            accounts: ['281ff7294b2a58fa91d1aae03ce8a09f6ea64117f657062c3a957457ef1e0044'],
        },
    },
}