/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as readline from 'node:readline';
import { stdin, stdout } from 'process';

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});
const totalDays = 365;

var roomArr = [];

/**
* MAIN FUNCTIONS
*/

while (1) {
    await start();
}


async function start() {
    const inputSize = await askQuestionPromise("Enter Hotel Size => ");
    const roomCount = Number(inputSize);

    if (!isRoomNumValid(roomCount)) {
        console.log("room size invalid!");
        return;
    }

    buildMatrix(roomCount);

    let continueFlag = true;

    while (continueFlag) {
        let input = await askQuestionPromise("Enter booking dates as (x,y) => ");
        bookingFunction(input);

        let confirmation = await askQuestionPromise("Continue (y/n) ?? => ");
        continueFlag = (confirmation && confirmation.toLowerCase() != "n") ? true : false;
    }

    // rl.close();
}

/**
* HELPER FUNCTIONS
*/

async function askQuestionPromise(questionText) {
    return new Promise(resolve => {
        rl.question(questionText, resolve)
    })
}

// check if number is valid, more than 0 and whole number
function isRoomNumValid(num) {
    return !isNaN(num) && num > 0 && num % 1 == 0;
}
// check if dates are valid and gtre 0 and whole number
function isDateValid(num) {
    return !isNaN(num) && num >= 0 && num % 1 == 0;
}

function buildMatrix(size) {
    let outerArr = new Array(size);
    for (let index = 0; index < outerArr.length; index++) {
        outerArr[index] = new Array(totalDays).fill(false);
    }
    roomArr = outerArr;
}

function bookingFunction(input) {
    let arr = input.split(',');
    if (arr?.length !== 2) {
        // console.log("invalid dates!");
        console.log('Declined!');
        return;
    }
    let startDate = isDateValid(arr[0]) ? Number(arr[0]) : null;
    let endDate = isDateValid(arr[1]) ? Number(arr[1]) : null;
    // invalid dates conditions
    if ((startDate == null || endDate == null)
        || (startDate > totalDays)
        || (endDate > totalDays)
        || (startDate > endDate)) {
        console.log('Declined!');
        return;
    }

    let index = roomArr.findIndex((calenderArr) => {
        let splicedArr = calenderArr.slice(startDate, endDate + 1);
        if (splicedArr.includes(true))
            return false;
        return true;
    });

    if (index === -1) {
        console.log('Declined!');
        return;
    }

    let calenderArr = roomArr[index];
    let updatedArr = new Array(endDate - startDate + 1).fill(true);
    calenderArr.splice(startDate, endDate - startDate + 1, ...updatedArr);
    roomArr[index] = calenderArr;
    console.log('Accepted!');
    // console.table(roomArr);
}