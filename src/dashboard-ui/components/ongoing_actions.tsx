import { PaperClipOutlined } from "@ant-design/icons";
import {
  Table,
  Row,
  Col,
  Button,
  Select,
  Input,
  Tooltip,
  message,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getActionsTabData, updateStatus } from "../../store/slices/mainSlice";
import { loadingIndicator } from "./transactions";
import { getKeyByValue } from "./usersmenu";
const { TextArea } = Input;
const SK_FILTER = "sk";
const DETAILS_FILTER = "details";
const CATEGORY_FILTER = "category_type";
const PK_FILTER = "pk";
const STATUS_FILTER = "status";
const REQUEST_FILTER = "details";

export interface itemInterface {
  additional_info: string;
  quantity: string;
  created_at: string;
  request: string;
  FO_id: string;
  price_per_qtl: string;
  status: string;
  category_type: string;
  produce: string;
  intent_to_sell: string;
  category: string;
  variety: string;
  sk: string;
  pk: string;
  details: string;
  doc_location: string;
}
interface propType {
  data: any;
  name: string;
}
const OngoingActions = (props: propType) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setremarks("");
    setIsModalVisible(false);
  };
  const { requests, category_type, status } = useSelector(
    (state: RootState) => state.main.actionsTabData
  );
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  const { isActionsTabData } = useSelector((state: RootState) => state.main);
  var onGoingData = props.data;
  const dispatch = useDispatch();

  const { userName } = useSelector((state: RootState) => state.login);

  // const [selectorValues, setSelectorValues] = useState({
  //   category_type: [""],
  //   request_issue: [""],
  //   status: [""],
  // });

  const [allFilters, setAllFilters] = useState({
    pk: "",
    details: "",
    category_type: "",
    status: "",
    sk: "",
  });

  const [filteredData, setFilteredData] = useState([{}]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [remarks, setremarks] = useState("");

  // useEffect(() => {
  //   // This one is to create all values for the selector fields, runs everytime ongoing data changes
  //   let category_type: Array<string> = [];
  //   let request_issue: Array<string> = [];
  //   let status: Array<string> = [];

  //   onGoingData.forEach((item: itemInterface) => {
  //     if (!category_type.includes(item.category_type))
  //       category_type.push(item.category_type);
  //     if (!request_issue.includes(item.request))
  //       request_issue.push(item.request);
  //     if (!status.includes(item.status)) status.push(item.status);
  //   });

  //   setSelectorValues({
  //     category_type: category_type,
  //     request_issue: request_issue,
  //     status: status,
  //   });
  // }, [onGoingData]);

  const updateAllFilters = (grp: string, val: string) => {
    if (val === "undefined") val = "";
    if (grp == "pk" && val != "") {
      console.log(val);
      console.log(getKeyByValue(user_destiny_data, val));
      val = val.toUpperCase();
      var c: any = getKeyByValue(user_destiny_data, val);
      if (c === "undefined" || c === undefined) val = "###^&*(^&*";
      else val = c;
      console.log(val);
    }
    val = val.toLowerCase();
    let currFilter: Record<string, string> = {};
    currFilter[`${grp}`] = val;
    setAllFilters((prevState) => {
      const f = { ...prevState, ...currFilter };
      return f;
    });
  };

  useEffect(() => {
    // Everytime the filters change, Need to do filtering... so
    doFilterV2();
  }, [allFilters]);

  const doFilterV2 = () => {
    let noOfFilters = 0;
    let isNestedFilter = false;

    for (const [key, value] of Object.entries(allFilters)) {
      if (value.length !== 0) noOfFilters++;
      if (noOfFilters > 1) {
        isNestedFilter = true;
        break;
      }
    } // if all values length is zero, It just mean that no filters are applied
    if (noOfFilters === 0) {
      setIsFiltering(false);
      return;
    }

    let finalFilteredData: Array<itemInterface> = [];

    const noEmptyVal = (v: string) => {
      if (!Boolean(v)) return "`";
      return v;
    };

    let allData: Array<itemInterface> = onGoingData;
    allData.forEach((item: itemInterface) => {
      if (isNestedFilter) {
        if (
          item.sk &&
          item.sk.includes(allFilters.sk) &&
          item.request &&
          item.request.includes(allFilters.details) &&
          // item.details.includes(allFilters.details) &&
          item.pk &&
          item.pk.includes(allFilters.pk) &&
          item.status &&
          item.status.includes(allFilters.status) &&
          item.category_type &&
          item.category_type.includes(allFilters.category_type)
        )
          finalFilteredData.push(item);
      } else {
        if (
          (item.sk && item.sk.includes(noEmptyVal(allFilters.sk))) ||
          (item.request &&
            item.request.includes(noEmptyVal(allFilters.details))) ||
          // item.details.includes(noEmptyVal(allFilters.details)) ||
          (item.pk && item.pk.includes(noEmptyVal(allFilters.pk))) ||
          (item.status &&
            item.status.includes(noEmptyVal(allFilters.status))) ||
          (item.category_type &&
            item.category_type.includes(noEmptyVal(allFilters.category_type)))
        )
          finalFilteredData.push(item);
      }
    });

    // To remove any duplicates, If created at is same,
    // Then we can be sure that it is a duplicate record we added in the list
    // Got it from stackoverflow :P
    finalFilteredData = finalFilteredData.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.created_at === value.created_at)
    );
    setIsFiltering(true);
    setFilteredData(finalFilteredData);
  };

  const { Option } = Select;

  const columns = [
    {
      title: (
        <Row>
          <Col span={24}>Action ID</Col>
          <Col span={24}>
            <Input
              className="filters"
              placeholder="Search"
              allowClear
              onChange={(val) => updateAllFilters(SK_FILTER, val.target.value)}
            />
          </Col>
        </Row>
      ),
      dataIndex: "sk",
      key: "sk",
      render: (val: string) => {
        return (
          <>
            <Tooltip title={val}>
              <span style={{ paddingLeft: 5 }}>
                {val.slice(val.indexOf("#") + 1, val.indexOf("#") + 10)}..
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: (
        <Row>
          <Col span={24}>Category</Col>
          <Col span={24}>
            <Select
              className="filters"
              placeholder="Select"
              allowClear
              onChange={(val) => updateAllFilters(CATEGORY_FILTER, `${val}`)}
            >
              {category_type.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      dataIndex: "category_type",
      key: "category_type",
    },
    {
      title: (
        <Row>
          <Col span={24}>Request/Issue</Col>
          <Col span={24}>
            <Select
              allowClear
              className="filters"
              placeholder="Select"
              onChange={(val) => updateAllFilters(REQUEST_FILTER, `${val}`)}
            >
              {requests.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      dataIndex: "request",
      key: "request",
    },
    {
      title: (
        <Row>
          <Col span={24}>Seller/BuyerID</Col>
          <Col span={24}>
            <Input
              className="filters"
              placeholder="Search"
              allowClear
              onChange={(e) => updateAllFilters(PK_FILTER, e.target.value)}
            />
          </Col>
        </Row>
      ),
      key: "pk",
      dataIndex: "pk",
      render: (pk: any) => (
        <>
          {user_destiny_data[pk] != "" ? (
            <>{user_destiny_data[pk]}</>
          ) : (
            <>---</>
          )}
          <br></br>
        </>
      ),
    },
    {
      title: (
        <Row>
          <Col span={24}>Details</Col>
          <Col span={24}>
            <Input
              className="filters"
              placeholder="Search"
              allowClear
              onChange={(e) => updateAllFilters(DETAILS_FILTER, e.target.value)}
            />
          </Col>
        </Row>
      ),

      render: (details: any, record: any) => {
        return (
          <>
            {!details && !record.doc_location && <>No details provided</>}
            {details && (
              <>
                {details}
                <br></br>
              </>
            )}
            {record.doc_location && (
              <a href={record.doc_location} target="_blank" rel="noreferrer">
                <PaperClipOutlined />
                {record.doc_location.slice(
                  record.doc_location.lastIndexOf("/") + 1,
                  record.doc_location.length
                )}
              </a>
            )}
          </>
        );
      },

      key: "details",
      dataIndex: "details",
    },
    {
      title: (
        <Row>
          <Col span={24}>Status</Col>
          <Col span={24}>
            <Select
              allowClear
              className="filters"
              placeholder="Select"
              onChange={(val) => updateAllFilters(STATUS_FILTER, `${val}`)}
            >
              {status.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      key: "request",
      dataIndex: "status",
      render: (status: any, record: any) => <>{status}</>,
    },
    {
      title: "",
      key: "status",
      dataIndex: "status",
      className: props.name === "ongoing" ? "" : "display-none",
      render: (status: any, record: any | itemInterface) =>
        status === undefined ? (
          <h4>---</h4>
        ) : (
          <>{decideHtml(status, record.pk, record.sk)}</>
        ),
    },
  ];
  const ACCEPT = "approved";
  const REJECT = "rejected";
  const ESCALATE_TO_ADMIN = "escalate to admin";
  let skey = "";
  let pkey = "";
  const [keyData, setKeyData] = useState({
    sKey: "",
    pKey: "",
  });
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleStatusChange = async (
    pk: string,
    sk: string,
    key: number,
    remarks: string
  ) => {
    // console.log(skey, pkey);
    let status = ACCEPT;
    let re = remarks;
    switch (key) {
      case 0:
        status = ACCEPT;
        break;
      case 1:
        status = REJECT;
        break;
      default:
        status = ESCALATE_TO_ADMIN;
        console.log(status);
    }
    console.log(pk, sk);
    console.log("SJSJSJ");
    // const response = await updateStatus({
    //   sk: skey,
    //   pk: pkey,
    //   status: status,
    //   remarks: re,
    // });
    setIsModalVisible(false);
    //   const hide = message.loading("Action in progress..", 0);

    // hide();
    // setTimeout(() => {
    //   dispatch(getActionsTabData(userName));
    // }, 3000);

    setremarks("");
  };

  const decideHtml = (text: string, pk: string, sk: string) => {
    text = text.toLocaleLowerCase();
    sk = sk.toLocaleLowerCase();
    if (
      sk &&
      (sk.includes("verification") ||
        sk.includes("cheque_confirmation") ||
        sk.includes("cash_confirmation")) &&
      text &&
      text.includes("pending")
    ) {
      return (
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Button
              onClick={() => {
                pkey = pk;
                skey = sk;

                handleStatusChange(pk, sk, 0, remarks);
              }}
              className="approveButton"
              block
              type="primary"
            >
              Approve
            </Button>
          </Col>
          <Col span={12}>
            <Button
              block
              onClick={() => {
                pkey = pk;
                skey = sk;

                setKeyData({
                  sKey: sk,
                  pKey: pk,
                });

                showModal();
              }}
              className="rejectButton"
            >
              Reject
            </Button>
            <Modal
              title="Remarks"
              visible={isModalVisible}
              onOk={(e) => {
                if (remarks.length == 0) {
                  handleCancel();
                  return;
                }

                handleStatusChange(keyData.pKey, keyData.sKey, 1, remarks);
              }}
              onCancel={handleCancel}
              centered
            >
              <TextArea
                rows={4}
                style={{ marginTop: "-20px" }}
                onChange={(e) => {
                  setremarks(e.target.value);
                }}
                value={remarks}
                required={true}
              />
            </Modal>
          </Col>
          <Col span={24}>
            <Button
              className="escalateButtonStyle"
              onClick={() => {
                pkey = pk;
                skey = sk;
                handleStatusChange(pk, sk, 2, remarks);
              }}
              block
            >
              Escalate to Admin
            </Button>
          </Col>
        </Row>
      );
    } else if (text && text.includes("pending")) {
      return (
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Button
              onClick={() => {
                pkey = pk;
                skey = sk;
                handleStatusChange(pk, sk, 0, remarks);
              }}
              className="approveButton"
              block
              type="primary"
            >
              Approve
            </Button>
          </Col>
          <Col span={12}>
            <Button
              block
              onClick={() => {
                pkey = pk;
                skey = sk;
                handleStatusChange(pk, sk, 1, remarks);
              }}
              className="rejectButton"
            >
              Reject
            </Button>
          </Col>
          <Col span={24}>
            <Button
              className="escalateButtonStyle"
              onClick={() => {
                pkey = pk;
                skey = sk;
                console.log("escalate........");
                console.log(skey);
                console.log(pkey);
                handleStatusChange(pk, sk, 2, remarks);
              }}
              block
            >
              Escalate to Admin
            </Button>
          </Col>
        </Row>
      );
    } else if (text.includes("auto escalated to admin")) {
      return (
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Button
              onClick={() => handleStatusChange(pk, sk, 0, remarks)}
              className="approveButton"
              block
              type="primary"
              disabled
            >
              Approve
            </Button>
          </Col>
          <Col span={12}>
            <Button
              block
              onClick={() => handleStatusChange(pk, sk, 1, remarks)}
              className="rejectButton"
              disabled
            >
              Reject
            </Button>
          </Col>
          <Col span={24}>
            <Button
              className="escalateButtonStyle"
              onClick={() => handleStatusChange(pk, sk, 2, remarks)}
              block
              disabled
            >
              Escalate to Admin
            </Button>
          </Col>
        </Row>
      );
    } else if (text === "to be resolved") {
      return (
        <Row gutter={[8, 8]}>
          <Col span={20}>
            <Button block type="primary" className="esolveButton">
              Mark as resolved
            </Button>
          </Col>
          <Col span={20}>
            <Button className="escalateButtonStyle" block>
              Escalate to admin
            </Button>
          </Col>
        </Row>
      );
    }
    return "";
  };

  return (
    <div className="ongoing-actions">
      {!isActionsTabData ? (
        loadingIndicator
      ) : (
        <Table
          columns={columns}
          dataSource={isFiltering ? filteredData : onGoingData}
          pagination={{ position: ["bottomLeft"], pageSize: 8 }}
          scroll={{ x: 1350 }}
        />
      )}
    </div>
  );
};

export default OngoingActions;
