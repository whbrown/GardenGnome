const tabletojson = require('tabletojson');
// const axios = require('axios');
// const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
// const Plant = require('../models/Plant');

const html = fs.readFileSync(path.resolve(__dirname, './companions.html'), {
  encoding: 'UTF-8',
});
const converted = tabletojson.convert(html);
console.log('first table', converted[5]);
