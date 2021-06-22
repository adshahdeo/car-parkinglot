const Car = require ('./car');

class ParkingSlot {

    constructor (totalSlots) {
        this.slots = new Array (totalSlots).fill(null);
        this.availableSlots = totalSlots;
    }

    parkACar (color, registrationNumber) {
        for (let i in this.slots) {
            if (this.slots [i] === null) {
                this.slots [i] = new Car (color, registrationNumber, i + 1);
                this.availableSlots--;
                return `Car has been assigned the slot ${i + 1}`;
            }
        }

        return `Sorry, No slots are available`;
    }

    removeACar (slot) {
        if (!this.availableSlots) return `Error : Car Parking is empty`;
        this.slots [slot] = null;
        this.availableSlots--;
        return `Car moved from the parked spot, now slot ${slot} is free`;
    }

    getCarsByColor (color) {
        const carRegistrationNumbers = [];

        for (let slot in this.slots) {
            if (slot.color === color) {
                carRegistrationNumbers.push(slot.reregistrationNumber)
            }
        }

        return carRegistrationNumbers ? carRegistrationNumbers : `No cars found matching the ${color} colour`;
    }

    getSlotsByColor (color) {
        const slotNumbers = [];

        for (let slot in this.slots) {
            if (slot.color === color) {
                slotNumbers.push(slot.slotNumber)
            }
        }

        return slotNumbers ? slotNumbers : `No slots found with cars matching the ${color} colour`;
    }

    getSlotByRegistrationNumber (registrationNumber) {

        for (let slot in this.slots) {
            if (slot.registrationNumber === registrationNumber) {
                return slot.slotNumber;
            }
        }


        return `No car found with the entered registration number`;
    }
};

module.exports = ParkingSlot;