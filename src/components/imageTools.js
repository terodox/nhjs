"use strict";

const jimp = require("jimp");

module.exports.resize = function (buffer) {
    const resizeWidth = 200;
    return jimp.read(buffer)
        .then(image => {
            console.log("Starting image resize");
            return new Promise((resolve, reject) => {
                image.resize(jimp.AUTO, resizeWidth)
                    .getBuffer(jimp.MIME_JPEG, (err, buffer) => {
                        if(err) {
                            reject(err);
                            return;
                        }
                        resolve(buffer);
                    });
            });
        })
};