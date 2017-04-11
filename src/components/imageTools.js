"use strict";

const jimp = require("jimp");

module.exports.resize = function (buffer) {
    const resizeWidth = 200;
    jimp.read(buffer)
        .then(image => {
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