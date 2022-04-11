import "antd/dist/antd.css";
import { Popover, Button } from "antd";
// import "./PopOverCompo.scss";
import { Select } from "antd";

import CreateActionForm from "./CreateActionForm";
import { useState } from "react";

const { Option } = Select;
export default function PopOverCompo() {
  const [isPopVisible, setIsPopVisible] = useState(false);

  const togglePopup = () => {
    setIsPopVisible((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="popover" style={{ clear: "both", whiteSpace: "nowrap" }}>
      <Popover
        placement="bottomLeft"
        content={<CreateActionForm onDone={togglePopup} />}
        trigger="click"
        overlayStyle={{
          width: "100%",
          maxWidth: "91%",
          position: "absolute",
        }}
        overlayInnerStyle={{
          border: "1px solid #12805C",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "10px",
        }}
        visible={isPopVisible}
        autoAdjustOverflow={true}
      >
        <Button
          className="createnewButton"
          type="primary"
          onClick={togglePopup}
        >
          + Create New Action
        </Button>
      </Popover>
    </div>
  );
}
