"use strict";

const AWS = require("aws-sdk");

const getS3InfoFromEvent = require("./components/getS3InfoFromEvent");
const {convert, resize} = require( "./components/imageTools");

const s3Client = new AWS.S3({
    region: process.env.AWS_DEFAULT_REGION
});
const destinationBucket = process.env.destinationBucket;

exports.handler = function (event, context, callback) {
    console.info("event:", event);

    try {
        const {srcBucket, srcKey} = getS3InfoFromEvent(event);
        console.info("Source Bucket:", srcBucket);
        console.info("Source Key:", srcKey);
        console.info("Destination Bucket:", destinationBucket);

        const downloadOptions = {
            Bucket: srcBucket,
            Key: srcKey
        };

        const uploadOptions = {
            Bucket: destinationBucket,
            Key: `images/${fileName}.jpg`,
            Body: null,
            ContentType: 'JPG'
        };

        s3Client.getObject(downloadOptions).promise()
            .then(response => convert(response.Body))
            .then(buffer => resize(buffer))
            .then(data => {
                uploadOptions.Body = data;
                return s3Client.putObject(uploadOptions).promise();
            })
            .catch(err => {
                console.log(err);
                callback(err);
            });

    } catch (err) {
        console.error(err);
    }
    callback("Operation did not complete as expected");
};