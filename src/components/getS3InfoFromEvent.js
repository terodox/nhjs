"use strict";

const path = require("path");

module.exports = function (event) {
    const srcBucket = event.Records[0].s3.bucket.name;
    const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    const fileName = path.basename(srcKey);

    return {
        srcBucket,
        srcKey,
        fileName
    };
};