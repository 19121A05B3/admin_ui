import S3FileUpload from "react-s3";

export const uploadFileToS3 = async (fileToUpload) => {
  const config = {
    bucketName:
      //  "testingbuckets3samparkbindhu",
      process.env.REACT_APP_BUCKET_NAME,
    region: "ap-south-1",
    accessKeyId: process.env.REACT_APP_S3_ACCESS_TOKEN,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
  };
  //

  let loc = "";

  try {
    const result = await S3FileUpload.uploadFile(fileToUpload, config);
    loc = result["location"];
    console.log(result);
    console.log("SUCCESS");
  } catch (error) {
    console.log(error);
  }

  return loc;
};
