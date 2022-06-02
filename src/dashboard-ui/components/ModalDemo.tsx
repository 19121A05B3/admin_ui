import { useState } from "react";
import "antd/dist/antd.css";
import { Col, Modal, Row } from "antd";
import SampleTable from "./SampleTable";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface proptype {
  seller_id: string;
  name: string;
  produce_list: any;
  issues: number;
  is_seller: number;
}
export default function ModalDemo(props: proptype) {
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  var s = props.seller_id;

  const [visible, setVisible] = useState(false);
  return (
    <>
      {props.issues === 0 && props.is_seller === 1 && (
        <div className="produce-list" onClick={() => setVisible(true)}>
          Produce List
        </div>
      )}
      {props.issues === 0 && props.is_seller === 0 && (
        <div className="produce-list" onClick={() => setVisible(true)}>
          Interested to Buy
        </div>
      )}
      {props.issues === 1 && props.produce_list[s].length > 0 && (
        <div className="produce-list" onClick={() => setVisible(true)}>
          View
        </div>
      )}
      <Modal
        title=""
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
        footer={null}
      >
        <Row>
          <Col
            xs={{ span: 4 }}
            sm={{ span: 4 }}
            lg={{ span: 2 }}
            md={{ span: 3 }}
          >
            ID
          </Col>
          {user_destiny_data[props.seller_id] != "" ? (
            <Col>: {user_destiny_data[props.seller_id]}</Col>
          ) : (
            <Col>: ---</Col>
          )}

        </Row>
        <Row>
          <Col
            xs={{ span: 4 }}
            sm={{ span: 4 }}
            lg={{ span: 2 }}
            md={{ span: 3 }}
          >
            Name{" "}
          </Col>
          <Col>: {props.name}</Col>
        </Row>
        {props.issues === 0 && (
          <Row>
            <Col
              xs={{ span: 4 }}
              sm={{ span: 4 }}
              lg={{ span: 2 }}
              md={{ span: 3 }}
            >
              Produces
            </Col>
            {props && props.produce_list[s]?.length > 0 && (
              <Col>: {props.produce_list[s]?.length}</Col>
            )}
            {props && !props.produce_list[s]?.length && <td>: 0</td>}
          </Row>
        )}
        {props.issues === 1 && (
          <Row>
            <Col
              xs={{ span: 4 }}
              sm={{ span: 4 }}
              lg={{ span: 2 }}
              md={{ span: 3 }}
            >
              Issues &emsp;
            </Col>
            {props && props.produce_list[s]?.length > 0 && (
              <Col>: {props.produce_list[s]?.length}</Col>
            )}
            {props && !props.produce_list[s]?.length && <Col>: 0</Col>}
          </Row>
        )}
        {props.produce_list[s]?.length > 0 && (
          <SampleTable
            produce_list={props.produce_list[s]}
            issues={props.issues}
            is_seller={props.is_seller}
          />
        )}
        <div className="done-close" onClick={() => setVisible(false)}>
          Done
        </div>
      </Modal>
    </>
  );
}
