import React, { useRef } from "react";
import { S3 } from "aws-sdk";

const UploadImages = (props) => {
  const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET_PRODUCTION,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const files = fileInput.current.files;
    const imgFiles = [];
    for (let i = 0; i < files.length; i++) {
      imgFiles.push("https://photo-companion-production.s3.amazonaws.com/".concat(files[i].name));
      await handleUpload(files[i]);
    }
    props.setImageFiles(imgFiles);
  };

  const handleUpload = async (file) => {
    const s3 = new S3({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });

    const newFileName = file.name;
    const uploadParams = {
      Bucket: config.bucketName,
      Key: newFileName,
      Body: file,
      ACL: "public-read",
    };

    try {
      await s3.upload(uploadParams).promise();
      console.log("success");
    } catch (error) {
      console.error("fail", error);
    }
  };

  const fileInput = useRef();

  return (
    <>
      <div className="upload-steps">
        <label>
          Upload file:
          <input type="file" multiple ref={fileInput} />
        </label>
        <br />
        <button onClick={handleClick} type="submit" value="Upload">
          Upload
        </button>
      </div>
    </>
  );
};

export default UploadImages;
