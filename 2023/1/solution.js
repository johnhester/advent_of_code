const fs = require('fs/promises');
const { parse } = require('path');

/*
The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?
*/

const solutionOne = async () => {
    // use fs to read data
    let data = await fs.readFile('./input.txt', 'utf8', (err, data) => {
        if (err) throw err;
        return data;
    });
    //split data into array
    let data_arr = data.split('\n');
    //iterate throught and sum calibration values returned
    let totalSum = 0;
    let calibration_values = [];
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
    //calibration value is the number made up of combining the first and last int of each string
    let nums = [];
    console.log(`line: ${str}`);
    // iterate through string and remove numbers
    for (let i = 0; i < str.length; i++) {
        if (parseInt(str[i])) {
            nums.push(str[i]);
        }
    }
    console.log(`nums: ${nums}`);
    //return single int or combined calibration value
    if (nums.length === 0) {
        console.log('no nums found');
    }
    if (nums.length === 1) {
        return parseInt(nums[0] + nums[0]);
    }
    if (nums.length >= 2) {
        return parseInt(nums[0] + nums.pop());
    }
};

solutionOne();
