import "antd/dist/antd.css";
import { Popover, Button } from "antd";

import CreateActionForm from "./CreateActionForm";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function PopOverCompo() {
  const [instanceKey, setInstanceKey] = useState(0);




  return (
    <div className="popover" style={{ clear: "both", whiteSpace: "nowrap" }}>
      <Popover
        placement="bottomLeft"
        content={<CreateActionForm key={instanceKey} />}
        trigger="click"
        onVisibleChange={() => {
          const newKey = instanceKey + 1;
          setInstanceKey(newKey);
          console.log(instanceKey);
        }}
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
        // visible={isPopVisible}
        autoAdjustOverflow={true}
      >
        <Button className="createnewButton" type="primary">
          + Create New Action
        </Button>
      </Popover>
    </div>
  );
}
