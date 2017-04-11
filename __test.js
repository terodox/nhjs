"use strict";

const handler = require("./src/index").handler;

const event = {
    "Records": [
        {
            "eventVersion": "2.0",
            "eventSource": "aws:s3",
            "awsRegion": "us-east-1",
            "eventTime": "2017-04-11T10:06:01.550Z",
            "eventName": "ObjectCreated:Put",
            "userIdentity": {
                "principalId": "AWS:AIDAINE6SKRY3Q4KS6SCS"
            },
            "requestParameters": {
                "sourceIPAddress": "66.30.101.192"
            },
            "responseElements": {
                "x-amz-request-id": "68628BA7290475CD",
                "x-amz-id-2": "I6DlOM3L9XbMstUuEpqaPAyVZXliPr4MWRFbJkpdlVycMkebsNZBlFH9jo/qyV43M/ij3weU1tk="
            },
            "s3": {
                "s3SchemaVersion": "1.0",
                "configurationId": "7f9ad2e5-b406-482e-abdb-133a05538e6a",
                "bucket": {
                    "name": "adesmarais-nhjs-origin-bucket",
                    "ownerIdentity": {
                        "principalId": "A130K32VG3LGHT"
                    },
                    "arn": "arn:aws:s3:::adesmarais-nhjs-origin-bucket"
                },
                "object": {
                    "key": "Andy_headshotWebCrop8.JPG",
                    "size": 367660,
                    "eTag": "1d1fc457d3ae63a3fb2a90f65dc526c4",
                    "sequencer": "0058ECAA892DFCCBC8"
                }
            }
        }
    ]
};

const callback = (err, success) => {
    console.log(err);
    console.log(success);
};

handler(event, {}, callback);