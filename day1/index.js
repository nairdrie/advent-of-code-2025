const fs = require('fs');

function numZeroPasses(instructions) {
    let dialRotation = 50;
    let numZeroes = 0;
    for(let instruction of instructions) {
        const preInstructionPosition = dialRotation;
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
            if(preInstructionPosition != 0) numZeroes++;
        }
        // Edge case, it landed on 0 without going past.
        else if(dialRotation == 0) {
            numZeroes++;
        }

        // check num zero passes due to full rotations;

        numZeroes += numFullRotations;
    }

    return numZeroes;
}

const instructions = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

console.log(numZeroPasses(instructions));