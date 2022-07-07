import "antd/dist/antd.css";
import { Upload, Button, message } from "antd";
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
        const isPdf = [
          ".pdf",
          "application/pdf",
          ".csv",
          "application/csv",
        ].includes(file.type);
        if (!isPdf) {
          message.error(`${file.name} is not a proper file`);
          return isPdf || Upload.LIST_IGNORE;
        }
        if (file.size > 1048576) {
          message.error(`${file.name} the file is larger than 1MB`);
          return Upload.LIST_IGNORE;
        }
        props.onSubmit(file);
        return false;
      }}
      accept=".csv,.pdf"
    >
      <Button className="attachfile" icon={<PaperClipOutlined />}>
        Attach file
      </Button>
    </Upload>
  );
}
