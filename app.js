const express = require('express');
const fs = require ('fs');
const readLine = require ('readline');

const commandLineInputs = process.argv;

const askUserInputInTerminal = () => {

    const prompts = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    let choiceString = `Please read the options for interaction\n`;
    choiceString += `1. Create a Parking lot\n`;
    choiceString += `2. Park a Car into a parking slot\n`;
    choiceString += `3. Remove a Car from parking slot\n`;
    choiceString += `4. Find Cars by color\n`;
    choiceString += `5. Find Parking slots by color\n`;
    choiceString += `6. Find a slot by Car registration Number\n`;
    choiceString += `Enter your option for input :\n`
    prompts.question(choiceString, function (data) {
        processUserInputs(data);
    });
}

askUserInputInTerminal();

const ParkingLot = require ('./models/parkingSlot');
let parking = null;

const processUserInputs = (choice) => {
    if (isNaN(parseInt(choice)) === true) {
        console.log(`Invalid Input, please try again`);
        askUserInputInTerminal();
        return;
    }

    const prompts = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    switch (choice) {
        case `1`    :   if (!parking) {
                            prompts.question (`Please enter parking lot capacity :\n`, (maxSlots) => {
                                parking = new ParkingLot (parseInt (maxSlots));
                                askUserInputInTerminal();
                            });
                        } else {
                            console.log (`Sorry, you have already set capacity for parking lot, please select any other option`);
                            askUserInputInTerminal();
                        }
                        break;

        case `2`    :   if (!!parking) {
                            prompts.question (`Please enter car colour and registration number seperated by space :\n`, (carDetailsStr) => {
                                askUserInputInTerminal();
                                let carDetails = carDetailsStr.split (' ');
                                console.log (parking.parkACar (carDetails[0], carDetails[1]));
                            });
                        } else {
                            console.log (`You have not set a parking capacity, kindly set parking capacity`);
                            askUserInputInTerminal();
                        }
                        break;

        case `3`    :   if (!!parking) {
                            prompts.question (`Please enter car slot number :\n`, (slot) => {
                                console.log (parking.removeACar (parseInt (slot)));
                                askUserInputInTerminal();
                            });
                        } else {
                            console.log (`You have not set a parking capacity, kindly set parking capacity`);
                            askUserInputInTerminal();
                        }
                        break;

        case `4`    :   if (!!parking) {
                            prompts.question (`Please enter car color to find matching cars :\n`, (color) => {
                                console.log (parking.getCarsByColor (color));
                                askUserInputInTerminal();
                            });
                        } else {
                            console.log (`You have not set a parking capacity, kindly set parking capacity`);
                            askUserInputInTerminal();
                        }
                        break;

        case `5`    :   if (!!parking) {
                            prompts.question (`Please enter car color to find slots :\n`, (color) => {
                                console.log (parking.getSlotsByColor (color));
                                askUserInputInTerminal();
                            });
                        } else {
                            console.log (`You have not set a parking capacity, kindly set parking capacity`);
                            askUserInputInTerminal();
                        }
                        break;

        case `6`    :   if (!!parking) {
                            prompts.question (`Please enter car registration number for slot :\n`, (regNum) => {
                                console.log (parking.getSlotByRegistrationNumber (regNum));
                                askUserInputInTerminal();
                            });
                        } else {
                            console.log (`You have not set a parking capacity, kindly set parking capacity`);
                            askUserInputInTerminal();
                        }
                        break;

        default     :   console.log(`Invalid Input, please try again`);
                        askUserInputInTerminal();
                        break;
    }
    return;
}

const app = express();
module.exports = app;