"use strict";

const getS3InfoFromEvent = require("./components/getS3InfoFromEvent");
const {getObject, putJpg} = require("./components/s3Operations");
const {resize} = require( "./components/imageTools");

const destinationBucket = process.env.destinationBucket;

exports.handler = function (event, context, callback) {
    console.info("event:", JSON.stringify(event));

    try {
        const { srcBucket, srcKey, fileName } = getS3InfoFromEvent(event);
        console.info("Source Bucket:", srcBucket);
        console.info("Source Key:", srcKey);
        console.info("Destination Bucket:", destinationBucket);

        getObject(srcBucket, srcKey)
            .then(getObjectResponse => {
                console.info("Resizing Image");
                return resize(getObjectResponse.Body);
            })
            .then(data => {
                console.info("Uploading Image");
                return putJpg(destinationBucket, fileName, data);
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