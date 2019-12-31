const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let count = 0;

let parkingSlot = 0;
let options = 0
let parkingArr = [];

const mapSlot = (slots) => {
    for (let i = 0; i < slots; i++) {
        parkingArr.push(
            { index: i, status: 0, card: '' }
        )
    }
}


const findMinIndex = (arr) => {
    const arrAvailable = arr.filter((element) => {
        return element.status === 0
    })
    return arrAvailable[0].index;
}

const checkIsFullSlot = (arr, index) => {
    return index === arr.length
}

const checkIDCard = (arr, idCard) => {
    return parkingArr.findIndex(o => o.card === idCard)
}

const parkingPrice = (hour) => {
    const dataHours = Math.round(parseInt(hour));
    let fee = 10;
    if (dataHours > 2) {
        fee += (dataHours - 2) * 10
    }
    return fee;
}

const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('create_parking_lot:', (answer) => {
            parkingSlot = parseInt(answer);
            mapSlot(parkingSlot)
            console.log(parkingArr)
            console.log(`Created parking lot with ${parkingSlot} slots Allocated slot `)
            resolve()
        })
    })
}

const question2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('Options \n 1. Park \n 2. Leave \n 3. Status \n 4. Exit \n Choose options:', async (answer) => {
            options = parseInt(answer);
            if (options === 1) {
                if (checkIsFullSlot(parkingArr, count)) {
                    console.log("Sorry, parking lot is full");
                } else {
                    await parkHandles()
                }
            } else if (options === 3) {
                parkingArr.forEach((element) => {
                    console.log(`${element.index}          ${element.card}`)
                })
            } else if (options === 2) {
                await leaveHandles()
            }
            resolve()
        })
    })
}

const parkHandles = () => {
    return new Promise((resolve, reject) => {
        rl.question('park:', (card) => {
            const indexAvailable = findMinIndex(parkingArr);
            parkingArr[indexAvailable].status = 1;
            parkingArr[indexAvailable].card = card;
            console.log(`Allocated slot number: ${indexAvailable}`)
            count++;
            resolve()
        })
    })
}

const leaveHandles = () => {
    return new Promise((resolve, reject) => {
        rl.question('leave (card_number hours):', (data) => {
            const dataCardLeave = data.split(" ");
            if (dataCardLeave.length !== 2) {
                console.log("Wrong format")
            } else {
                // const indexCard = parkingArr.findIndex(o => o.card === dataCardLeave[0]);
                const indexCard = checkIDCard(parkingArr, dataCardLeave[0]);
                if (indexCard === -1) {
                    console.log(`Registration number ${dataCardLeave[0]} not found`)
                } else {
                    parkingArr[indexCard].status = 0;
                    parkingArr[indexCard].card = "";
                    const dataHours = Math.round(parseInt(dataCardLeave[1]));
                    let fee = parkingPrice(dataHours)
                    console.log(`Registration number ${dataCardLeave[0]} with Slot Number ${indexCard} is free with Charge ${fee}`)
                    count--;
                }
            }
            resolve()
        })
    })
}
const main = async () => {
    await question1()
    while (options !== 4) {
        await question2()
    }
    rl.close()
}

main()

module.exports = {
    findMinIndex: findMinIndex,
    checkIsFullSlot: checkIsFullSlot,
    checkIDCard: checkIDCard,
    parkingPrice:parkingPrice
}