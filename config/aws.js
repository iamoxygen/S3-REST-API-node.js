const { S3Client } = require("@aws-sdk/client-s3");

const AWSCredentials = {
  accessKey: process.env.AWS_ACCESS_KEY,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

const client = new S3Client({
  region: AWSCredentials.region,
  credentials: {
    accessKeyId: AWSCredentials.accessKey,
    secretAccessKey: AWSCredentials.secret,
  },
  signatureVersion: "v4",
});
module.exports = client;
