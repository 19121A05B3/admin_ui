import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Menu,
  Row,
  Space,
  Typography,
} from "antd";
import { useState } from "react";

interface props {
  onSubmit: Function;
  name: string;
}

export const DateFilter = (props: props) => {
  const { onSubmit } = props;
  // const [radioValue, setRadioValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  // let initDate: string | undefined = undefined;
  const [selectedDate, setSelectedDate] = useState("");
  const [isCalenderShowing, setIsCalenderShowing] = useState(false);

  const toggleIsVisible = () => {
    setIsVisible((prevState) => !prevState);
  };

  const localOnSubmit = (clear: boolean) => {
    toggleIsVisible();
    // setRadioValue(0);
    if (selectedDate === undefined) return;

    onSubmit(clear ? "" : selectedDate);
  };

  // const handleOnChange = (selectedDate: number) => setRadioValue(selectedDate);

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
        {/* <Radio.Group
          onChange={(e) => handleOnChange(e.target.value)}
          value={radioValue}
        > */}
        <Space direction="vertical">
          {/* <Radio value={1}>Today</Radio>
            <Radio value={2}>Past 7 days</Radio>
            <Radio value={3}>This Month</Radio>
            <Radio value={4}>This Quarter</Radio>
            <Radio value={5}>This Year</Radio> */}
          {/* <Radio value={6}>Select Date</Radio> */}
          {/* {radioValue === 6 ? ( */}
          <DatePicker
            onClick={() => {
              setIsCalenderShowing((prevState) => !prevState);
            }}
            open={isCalenderShowing}
            onChange={(date) => {
              setSelectedDate(date?.toISOString() ?? "");
              setIsCalenderShowing(false);
            }}
          />
          {/* ) : null} */}
        </Space>
        {/* </Radio.Group> */}
      </Menu.Item>

      <Menu.Item>
        <Row>
          <Col>
            <Button
              style={{ margin: "auto" }}
              onClick={() => localOnSubmit(true)}
            >
              Reset
            </Button>
          </Col>

          <Col>
            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              onClick={() => localOnSubmit(false)}
            >
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