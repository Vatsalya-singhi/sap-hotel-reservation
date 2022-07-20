/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */

import * as readline from 'node:readline';
import { stdin, stdout } from 'process';

export enum status {
    "Declined" = "Declined",
    "Accepted" = "Accepted",
}

export class RoomBooking {

    private rl: readline.Interface;
    private totalDays: number;
    private roomArr: boolean[][];
    private continueFlag = true;

    constructor() {
        this.rl = readline.createInterface({
            input: stdin,
            output: stdout
        });
        this.totalDays = 365;
        this.roomArr = [];

        // this.startRoomBooking();
        // (async () => {
        //     while (true) {
        //         await this.startRoomBooking();
        //     }
        // })();
    }

    /**
    * PUBLIC FUNCTIONS
    */

    public async startRoomBooking(): Promise<void> {
        const inputSize: string = await this.askQuestionPromise("Enter Hotel Size => ");
        const roomCount = Number(inputSize);

        if (!this.isRoomNumValid(roomCount)) {
            console.log(status.Declined);
            return;
        }

        this.buildRoomMatrix(roomCount);

        while (this.continueFlag) {
            const input: string = await this.askQuestionPromise("Enter booking dates as (x,y) => ");
            this.bookingFunction(input);

            const confirmation: string = await this.askQuestionPromise("Continue (y/n) ?? => ");
            this.continueFlag = (confirmation && confirmation.toLowerCase() !== "n") ? true : false;
        }

        // rl.close();
    }

    /**
    * HELPER FUNCTIONS
    */

    private async askQuestionPromise(questionText: string): Promise<string> {
        return new Promise(resolve => {
            this.rl.question(questionText, resolve)
        })
    }

    private isRoomNumValid(num: number): boolean {
        return !isNaN(num) && num > 0 && num % 1 == 0;
    }

    private isDateValid(num: number): boolean {
        return !isNaN(num) && num >= 0 && num % 1 == 0;
    }

    public buildRoomMatrix(size: number): void {
        const outerArr: boolean[][] = new Array(size);
        for (let index = 0; index < outerArr.length; index++) {
            outerArr[index] = new Array(this.totalDays).fill(false);
        }
        this.roomArr = outerArr;
    }

    public bookingFunction(input: string): status {
        const inputArr: string[] = input.split(',');
        if (inputArr.length !== 2) {
            console.log(status.Declined);
            return status.Declined;
        }

        const startDate = this.isDateValid(Number(inputArr[0])) ? Number(inputArr[0]) : null;
        const endDate = this.isDateValid(Number(inputArr[1])) ? Number(inputArr[1]) : null;
        // invalid dates conditions
        if ((startDate == null || endDate == null)
            || (startDate > this.totalDays)
            || (endDate > this.totalDays)
            || (startDate > endDate)) {
            console.log(status.Declined);
            return status.Declined;
        }

        const index = this.roomArr.findIndex((calenderArr) => {
            const splicedArr = calenderArr.slice(startDate, endDate + 1);
            if (splicedArr.includes(true))
                return false;
            return true;
        });

        if (index === -1) {
            console.log(status.Declined);
            return status.Declined;
        }

        const calenderArr = this.roomArr[index];
        const updatedArr = new Array(endDate - startDate + 1).fill(true);
        calenderArr.splice(startDate, endDate - startDate + 1, ...updatedArr);
        this.roomArr[index] = calenderArr;
        console.log(status.Accepted);
        return status.Accepted;
    }

}

const obj = new RoomBooking();
obj.startRoomBooking();