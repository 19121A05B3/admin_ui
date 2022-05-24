import { DownOutlined, PropertySafetyOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  InputNumber,
  Menu,
  Row,
  Slider,
  Typography,
} from "antd";
import { useState } from "react";

interface props {
  onSubmit: Function;
  min: number;
  max: number;
  name: string;
}

export const RangeSelector = (props: props) => {
  const { onSubmit } = props;
  const [range, setRange] = useState([props.min, props.max]);
  const [isVisible, setIsVisible] = useState(false);

  const toggleIsVisible = () => {
    setIsVisible((prevState) => !prevState);
  };

  const localOnSubmit = (apply: number) => {
    toggleIsVisible();

    if (apply) {
      onSubmit(range);
    } else {
      setRange([props.min, props.max]);
      onSubmit([props.min, props.max]);
    }

    // onSubmit(range);
  };

  const handleOnChange = (min: number, max: number) => setRange([min, max]);

  const insideOverlay = (
    <Menu
      style={{
        maxWidth: "500px",
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <Menu.Item>
        <Row>
          <Col span={12}>
            <InputNumber
              style={{ margin: "0 16px" }}
              value={range[0]}
              onChange={(val) => handleOnChange(val, range[1])}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              style={{ margin: "0 16px" }}
              value={range[1]}
              onChange={(val) => handleOnChange(range[0], val)}
            />
          </Col>
        </Row>
      </Menu.Item>
      <Menu.Item>
        <Slider
          min={props.min - 5}
          max={props.max + 5}
          range
          step={10}
          value={[range[0], range[1]]}
          defaultValue={[props.min, props.max]}
          onChange={(val) => handleOnChange(val[0], val[1])}
        />
      </Menu.Item>

      <Menu.Item>
        <Row justify="end" gutter={[6, 0]}>
          <Col>
            <Button onClick={() => localOnSubmit(0)} type="text">
              Reset
            </Button>
          </Col>
          <Col>
            <Button onClick={() => localOnSubmit(1)} type="primary">
              Apply
            </Button>
          </Col>
        </Row>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Row>
        <Col span={24}>{props.name}</Col>
        <Col span={24}>
          <Dropdown
            visible={isVisible}
            overlay={insideOverlay}
            placement="bottomCenter"
            arrow
          >
            <Button
              onClick={toggleIsVisible}
              style={{ width: "160px", marginTop: "7px", textAlign: "left" }}
            >
              Select{" "}
              <DownOutlined style={{ float: "right", marginTop: "5px" }} />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </>
  );
};