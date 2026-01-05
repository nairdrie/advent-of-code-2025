const fs = require('fs');


function  numZeroPasses(instructions) {
    let dialRotation = 50;
    // console.log("Dial position: ", dialRotation);
    let numZeroes = 0;
    for(let instruction of instructions) {
        // console.log(instruction);
        let direction = instruction[0];
        let newRotation = instruction.substring(1);
        if(direction == 'L') newRotation = -newRotation;
        let deltaPosition = newRotation % 100;

        dialRotation += deltaPosition;

        let numFullRotations = Math.floor(Math.abs(newRotation) / 100);

        // rotate 99 -> 0 or 0 -> 99
        if(dialRotation >= 100) {
            dialRotation = dialRotation - 100;
            numZeroes++;
        }
        else if(dialRotation < 0) {
            dialRotation = 100 + dialRotation;
            numZeroes++;
        }
        // Edge case, it landed on 0 without going past.
        else if(dialRotation == 0 && numFullRotations == 0) {
            numZeroes++;
        }

        // check num zero passes due to full rotations;
        
        numZeroes += numFullRotations;
        // console.log("New Dial position: ", dialRotation);
        // console.log("Num zeroes: ", numZeroes);
    }

    return numZeroes;
}

const instructions = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

console.log(numZeroPasses(instructions));