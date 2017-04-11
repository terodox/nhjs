#!/usr/bin/env bash
zip -r ../deploy/deploy.zip *
cd ../deploy
aws cloudformation package --template-file ./sam.yaml --output-template-file ./cloudformation.yaml --s3-bucket dev-iad-builds.newforma.cloud --s3-prefix adesmaraisNhJs/current/deploy
aws cloudformation deploy --template-file ./cloudformation.yaml --stack-name adesmaraisNhJs --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM