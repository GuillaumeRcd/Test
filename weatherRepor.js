const fs = require("fs");

let result = {};

function createObject(path) {
  try {
    const data = fs.readFileSync(path, { encoding: "utf8" });
    weatherData = JSON.parse(data);
    result = calculateTemp(weatherData, result);
    result = findHighHumidityDay(weatherData, result);
    result = countRainDays(weatherData, result);
    console.log(result);
  } catch (error) {
    console.log(error);
    return;
  }
}

function calculateTemp(arr, res) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    count += arr[i].temperature;
  }
  res.averageTemp = count / arr.length;
  return res;
}

function findHighHumidityDay(arr, res) {
  let highest = 0;
  for (let item of arr) {
    if (item.humidity > highest) highest = item.humidity;
  }
  res.highHummidity = highest;
  return res;
}

function countRainDays(arr, res) {
  let count = 0;
  for (let item of arr) {
    if (item.precipitation > 0) count++;
  }
  res.numberOfRainyDays = count;
  return res;
}

createObject(process.argv[2]);
