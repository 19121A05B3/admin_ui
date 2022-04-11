import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Upload, message, Button } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";

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
      <Button className="attachfile" icon={<PaperClipOutlined />}>
        Attach file
      </Button>
    </Upload>
  );
}
