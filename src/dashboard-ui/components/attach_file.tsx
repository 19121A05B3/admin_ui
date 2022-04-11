import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./attach_file.scss";
import { Upload, Button } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { uploadFileToS3 } from "../../services/s3_service";

interface AttachFilePropType {
  onSubmit: (file: any) => void;
}

export default function AttachFile(props: AttachFilePropType) {
  return (
    <Upload
      maxCount={1}
      onRemove={(file) => console.log(file)}
      beforeUpload={(file) => {
        props.onSubmit(file);
        return false;
      }}
    >
      <Button type="primary">Upload a file</Button>
    </Upload>
  );
}
