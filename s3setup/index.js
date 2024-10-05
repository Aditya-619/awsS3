const {GetObjectCommand, S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

const client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.SECRETACCESSKEY
    }
});

const getObjectUrl = async(key) => {
    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET,
        Key: key
    });
    const url = await getSignedUrl(client, command);
    return url;
}

const putObjectUrl = async(fileName, contentType) => {
    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET,
        Key: `/uploads/wallpapers/${fileName}`,
        ContentType: contentType
    });
    const url = await getSignedUrl(client, command);
    return url;
}

const init = async() => {
    console.log('url ==========> ', await getObjectUrl('/uploads/wallpapers/jjk.png'))
    // console.log('url ==========> ', await putObjectUrl('jjk.png', 'image/png'))
}

init();