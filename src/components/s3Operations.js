"use strict";

const AWS = require("aws-sdk");

const s3Client = new AWS.S3({
    region: process.env.AWS_DEFAULT_REGION
});

module.exports.getObject = function (srcBucket, srcKey) {
    const downloadOptions = {
        Bucket: srcBucket,
        Key: srcKey
    };
    console.info("Downloading Image:", downloadOptions);
    return s3Client.getObject(downloadOptions).promise();
};

module.exports.putJpg = function (destinationBucket, destinationKey, buffer) {
    const uploadOptions = {
        Bucket: destinationBucket,
        Key: destinationKey,
        Body: buffer,
        ContentType: 'JPG'
    };
    console.info(`Uploading image to ${destinationBucket}/${destinationKey}`)
    return s3Client.putObject(uploadOptions).promise();
};