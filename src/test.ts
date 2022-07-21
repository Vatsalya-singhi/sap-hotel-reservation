import { expect } from 'chai';
import { RoomBooking, status } from './index';
import { describe, it } from 'mocha';
import 'mocha';

describe('RoomBooking', () => {

    it('TEST 1a/1b', () => {
        const roomBooking = new RoomBooking();
        roomBooking.buildRoomMatrix(1);
        expect(roomBooking.bookingFunction('-4,2')).to.deep.equal(status.Declined);
        expect(roomBooking.bookingFunction('200,400')).to.deep.equal(status.Declined);
    })

    it('TEST 2', () => {
        const roomBooking = new RoomBooking();
        roomBooking.buildRoomMatrix(3);
        expect(roomBooking.bookingFunction('0,5')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('7,13')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('3,9')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('5,7')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('6,6')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('0,4')).to.deep.equal(status.Accepted);
    })

    it('TEST 3', () => {
        const roomBooking = new RoomBooking();
        roomBooking.buildRoomMatrix(3);
        expect(roomBooking.bookingFunction('1,3')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('2,5')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('1,9')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('0,15')).to.deep.equal(status.Declined);
    })


    it('TEST 4', () => {
        const roomBooking = new RoomBooking();
        roomBooking.buildRoomMatrix(3);
        expect(roomBooking.bookingFunction('1,3')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('0,15')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('1,9')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('2,5')).to.deep.equal(status.Declined);
        expect(roomBooking.bookingFunction('4,9')).to.deep.equal(status.Accepted);
    })

    it('TEST 5', () => {
        const roomBooking = new RoomBooking();
        roomBooking.buildRoomMatrix(2);
        expect(roomBooking.bookingFunction('1,3')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('0,4')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('2,3')).to.deep.equal(status.Declined);
        expect(roomBooking.bookingFunction('5,5')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('4,10')).to.deep.equal(status.Declined);
        expect(roomBooking.bookingFunction('10,10')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('6,7')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('8,10')).to.deep.equal(status.Accepted);
        expect(roomBooking.bookingFunction('8,9')).to.deep.equal(status.Accepted);
    })

    it('Room Matrix', () => {
        const roomBooking = new RoomBooking();
        expect(roomBooking.buildRoomMatrix(-1)).to.deep.equal(false);
        expect(roomBooking.buildRoomMatrix(0)).to.deep.equal(false);
        expect(roomBooking.buildRoomMatrix(1)).to.deep.equal(true);
        expect(roomBooking.buildRoomMatrix(100)).to.deep.equal(true);
        expect(roomBooking.buildRoomMatrix(2.5)).to.deep.equal(false);
        expect(roomBooking.buildRoomMatrix(3.4)).to.deep.equal(false);
        expect(roomBooking.buildRoomMatrix(0.9999)).to.deep.equal(false);
    })

})