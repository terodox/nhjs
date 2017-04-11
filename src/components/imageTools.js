"use strict";

const gm = require("gm").subClass({
    imageMagick: true
});

exports.convert = function(data) {
    return new Promise((resolve, reject) => {
        gm(data)
            .antialias(true)
            .density(300)
            .toBuffer('JPG', function(err, buffer) {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
    });
};

exports.resize = function (buffer) {
    const resizeWidth = 200;
    return new Promise((resolve, reject) => {
        gm(buffer).size(function(err, size) {
            const scalingFactor = Math.min(
                resizeWidth / size.width, resizeWidth / size.height
            );
            console.log("scalingFactor:", scalingFactor);
            const width = scalingFactor * size.width;
            const height = scalingFactor * size.height;
            this.resize(width, height)
                .toBuffer('JPG', function(err, buffer) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                });
        });
    });
};