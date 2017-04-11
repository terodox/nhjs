"use strict";

const sharp = require("sharp");

module.exports.resize = function (buffer) {
    const resizeWidth = 200;
    return sharp(buffer)
        .resize(resizeWidth)
        .toBuffer();

};