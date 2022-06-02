import { useState } from "react";
import "antd/dist/antd.css";
import { Col, Modal, Row } from "antd";
import { Card } from "antd";
import { idCard } from "../../store/slices/mainSlice";
import { dp } from "../../helper";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const { Meta } = Card;

interface propType {
  seller_id: string;
  name: string;
  type: string;
}
export default function IDCard(props: propType) {
  const [visible, setVisible] = useState(false);
  const [idLocation, setIdLocation] = useState("");
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );

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
          {/* <Meta title={"Seller ID: " + props.seller_id} /> */}
          <Row>
            <Col
              xs={{ span: 5 }}
              sm={{ span: 5 }}
              lg={{ span: 3 }}
              md={{ span: 4 }}
            >
              ID &emsp;
            </Col>
            {user_destiny_data[props.seller_id] != "" ? (
              <Col>: {user_destiny_data[props.seller_id]}</Col>
            ) : (
              <Col>: ---</Col>
            )}
          </Row>
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
