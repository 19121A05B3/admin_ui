import { useState } from "react";
import "antd/dist/antd.css";
import { Col, Modal, Row } from "antd";
import { RootState } from "../../store";

import Transactions from "./Transactions copy";
import { useSelector } from "react-redux";

interface propType {
  seller_id: string;
  name: string;
  transaction_list: any;
  seller: number;
}
export default function ModalDemo(props: propType) {
  var s = props.seller_id;
  const [visible, setVisible] = useState(false);
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  return (
    <>
      <div className="produce-list" onClick={() => setVisible(true)}>
        Transactions
      </div>

      <Modal
        title=""
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={800}
        footer={null}
      >
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
        <Row>
          <Col
            xs={{ span: 5 }}
            sm={{ span: 5 }}
            lg={{ span: 3 }}
            md={{ span: 4 }}
          >
            Name &emsp;
          </Col>
          <Col>: {props.name}</Col>
        </Row>
        <Row>
          <Col
            xs={{ span: 5 }}
            sm={{ span: 5 }}
            lg={{ span: 3 }}
            md={{ span: 4 }}
          >
            Transactions &emsp;
          </Col>
          {props.transaction_list[s]?.length > 0 && (
            <Col>: {props.transaction_list[s].length}</Col>
          )}

          {!props.transaction_list[s]?.length && <Col>: 0</Col>}
        </Row>
        <br></br>
        {props.transaction_list[s]?.length > 0 && (
          <Transactions
            transaction_list={props.transaction_list[s]}
            seller={props.seller}
          />
        )}

        <div className="done-close" onClick={() => setVisible(false)}>
          Done
        </div>
      </Modal>
    </>
  );
}
