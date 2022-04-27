import { useState } from "react";
import "antd/dist/antd.css";
import { Modal } from "antd";
import { Card } from "antd";
import { idCard } from "../../store/slices/mainSlice";
import { dp } from "../../helper";
const { Meta } = Card;

interface propType {
  seller_id: string;
  name: string;
  type: string;
}
export default function IDCard(props: propType) {
  const [visible, setVisible] = useState(false);
  const [idLocation, setIdLocation] = useState("");

  const idRequest = async (userid: string, usertype: string) => {
    setVisible(true);
    const response = await idCard({ userid: userid, usertype: usertype });
    dp(response);
    if (response) setIdLocation(response);
  };

  return (
    <>
      <a onClick={() => idRequest(props.seller_id, props.type)}>ID Card</a>
      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Card bordered={false}>
          <Meta title={"Seller ID: " + props.seller_id} />
          {idLocation !== "" ? (
            <img src={idLocation} alt="error-loading" width="100%" />
          ) : (
            <p>No ID</p>
          )}
        </Card>

        <div className="ac">
          <a className="done" onClick={() => setVisible(false)}>
            Done
          </a>
        </div>
      </Modal>
    </>
  );
}
