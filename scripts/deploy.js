const main = async() => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');

    const gameContract = await gameContractFactory.deploy(
        ["Ironman", "Spiderman", "Thor", "Hulk", "Black Widow"], ["QmfQjfFJxLXYVMqwmiqrr96xjE9d2kagj2biiA3HoKZfF4",
            "QmQDuS2QL7WKDYWstb5AzN7jsKCZYU73gezAbfFiif7EgM",
            "QmdFYwdqSbo2g9nfQzsdYm8xsFmunhWDPnZaLoopS96pPC",
            "QmSjtmDPG5jcj94wTzFUnPawBfWbRPswTmgT8usFyZ51kA",
            "QmV2Mtu4nikbsATcjgrKaUbbo4REtt3TSqVwYQG4jkyyQ5"
        ], [250, 200, 300, 400, 450, 140], [70, 50, 90, 80, 40],
        "Thanos",
        "QmVtH8S4HuvvTu22UpDmE7ruMtvSqMSXMjH8reMyb7Q173",
        10000,
        50
    );

    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

};

const runMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();