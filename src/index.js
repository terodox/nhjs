"use strict";

const AWS = require("aws-sdk");

const getS3InfoFromEvent = require("./components/getS3InfoFromEvent");
const { resize } = require( "./components/imageTools");

const s3Client = new AWS.S3({
    region: process.env.AWS_DEFAULT_REGION
});
const destinationBucket = process.env.destinationBucket;

exports.handler = function (event, context, callback) {
    console.info("event:", JSON.stringify(event));

    try {
        const { srcBucket, srcKey, fileName } = getS3InfoFromEvent(event);
        console.info("Source Bucket:", srcBucket);
        console.info("Source Key:", srcKey);
        console.info("Destination Bucket:", destinationBucket);

        const downloadOptions = {
            Bucket: srcBucket,
            Key: srcKey
        };

        const uploadOptions = {
            Bucket: destinationBucket,
            Key: `${fileName}`,
            Body: null,
            ContentType: 'JPG'
        };

        console.info("Downloading Image:", downloadOptions);
        s3Client.getObject(downloadOptions).promise()
            .then(getObjectResponse => {
                console.info("Resizing Image");
                console.info(JSON.stringify(getObjectResponse));
                return resize(getObjectResponse.Body);
            })
            .then(data => {
                console.info("Uploading Image");
                uploadOptions.Body = data;
                return s3Client.putObject(uploadOptions).promise();
            })
            .then(() => {
                console.info("Operation completed successfully");
            })
            .catch(err => {
                console.error(err);
                callback("Unknown Error Occurred");
            });

    } catch (err) {
        console.error(err);
        callback("Operation did not complete as expected");
    }
};