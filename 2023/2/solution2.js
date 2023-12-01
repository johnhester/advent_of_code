const fs = require('fs/promises');
const { validateHeaderValue } = require('http');

/* 
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?
*/

const test_arr = [
    'two1nine',
    'eightwothree',
    'abcone2threexyz',
    'xtwone3four',
    '4nineeightseven2',
    'zoneight234',
    '7pqrstsixteen',
];

const validDigits = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
};

const solutionTwo = async () => {
    // use fs to read data
    let data = await fs.readFile('../1/input.txt', 'utf8', (err, data) => {
        if (err) throw err;
        return data;
    });
    //split data into array
    let data_arr = data.split('\n');
    //iterate throught and sum calibration values returned
    let totalSum = 0;
    for (let i = 0; i < data_arr.length; i++) {
        let calibrationValue = collectCalibrationValue(data_arr[i]);
        console.log(`calibrationValue: ${calibrationValue}`);
        totalSum += calibrationValue;
        console.log(`running total: ${totalSum}`);
    }
    console.log(`totalSum: ${totalSum}`);
    console.log(`lines: ${data_arr.length}`);
};

const collectCalibrationValue = (str) => {
    console.log('line:', str);
    let nums = [];
    let subStr = '';
    for (let i = 0; i < str.length; i++) {
        if (parseInt(str[i])) {
            nums.push(str[i]);
            subStr = '';
        } else {
            subStr += str[i];
            // console.log('subStr', subStr);
            //compare substring to acceptable 'digit' strings while allowing for overlapping spelling
            for (const digit in validDigits) {
                if (subStr.includes(digit)) {
                    nums.push(validDigits[digit]);
                    subStr = subStr[subStr.length - 1];
                }
            }
        }
    }
    console.log('nums:', nums);
    if (nums.length === 1) {
        return parseInt(nums[0] + nums[0]);
    }
    if (nums.length >= 2) {
        return parseInt(nums[0] + nums.pop());
    }
};

// collectCalibrationValue('eightwo4three3');

solutionTwo();
