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
        this.setRL(readline.createInterface({
            input: stdin,
            output: stdout
        }));
        this.setTotalDays(365);
        this.setRoomArr([]);
    }

    /**
    * PUBLIC FUNCTIONS
    */

    public async startRoomBooking(): Promise<void> {
        const inputSize: string = await this.askQuestionPromise("Enter Hotel Size => ");
        const roomCount = Number(inputSize);

        if (!this.buildRoomMatrix(roomCount)) {
            return;
        }

        while (this.getContinueFlag()) {
            const input: string = await this.askQuestionPromise("Enter booking dates as (x,y) => ");
            this.bookingFunction(input);

            const confirmation: string = await this.askQuestionPromise("Continue (y/n) ?? => ");
            const flag = (confirmation && confirmation.toLowerCase() !== "n") ? true : false;
            this.setContinueFlag(flag);
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

    public buildRoomMatrix(size: number): boolean {
        if (!this.isRoomNumValid(size)) {
            console.log(status.Declined);
            return false;
        }

        const outerArr: boolean[][] = new Array(size);
        for (let index = 0; index < outerArr.length; index++) {
            outerArr[index] = new Array(this.totalDays).fill(false);
        }
        this.setRoomArr(outerArr);
        return true;
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

        const roomArr = this.getRoomArr();

        const index = roomArr.findIndex((calenderArr) => {
            const splicedArr = calenderArr.slice(startDate, endDate + 1);
            if (splicedArr.includes(true))
                return false;
            return true;
        });

        if (index === -1) {
            console.log(status.Declined);
            return status.Declined;
        }

        const calenderArr = roomArr[index];
        const updatedArr = new Array(endDate - startDate + 1).fill(true);
        calenderArr.splice(startDate, endDate - startDate + 1, ...updatedArr);
        roomArr[index] = calenderArr;
        
        this.setRoomArr(roomArr);
        console.log(status.Accepted);
        return status.Accepted;
    }


    /**
    * GETTERS
    */

    public getRL(): readline.Interface {
        return this.rl;
    }
    public getTotalDays(): number {
        return this.totalDays;
    }
    public getRoomArr(): boolean[][] {
        return this.roomArr;
    }
    public getContinueFlag(): boolean {
        return this.continueFlag;
    }

    /**
    * SETTERS
    */

    public setRL(val: readline.Interface): void {
        this.rl = val;
    }
    public setTotalDays(val: number): void {
        this.totalDays = val;
    }
    public setRoomArr(arr: boolean[][]): void {
        this.roomArr = arr;
    }
    public setContinueFlag(val: boolean): void {
        this.continueFlag = val;
    }



}

const obj = new RoomBooking();
obj.startRoomBooking();