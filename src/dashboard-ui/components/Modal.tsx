import { Modal, Image } from "antd";
import { useState } from "react";

interface proptype {
  val: string;
}

export default function Modals(props: proptype) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <a onClick={showModal}>Photos</a>
      <Modal
        title="Produce Photos"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {props.val === undefined && <p>No produces photos available</p>}
        {props.val && (
          <Image
            width={200}
            src={props.val}
            preview={false}
            alt="Produce Photos"
          />
        )}
      </Modal>
    </>
  );
}
