"use strict";

exports.handler = function (event, context, callback) {
    callback(new Error("I will never work"));
};