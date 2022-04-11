import "antd/dist/antd.css";
import {
  Tabs,
  Table,
  Typography,
  Space,
  Select,
  Checkbox,
  Dropdown,
  Menu,
  Button,
  Row,
  Col,
  Tooltip,
  Input,
  Divider,
  Timeline,
} from "antd";
import { ColumnsType } from "antd/es/table";
import {
  IBuyerTransaction,
  ISellerTransaction,
  IUser,
} from "../../store/app_interfaces";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { RangeSelector } from "../../components/common/range_selector";
import { capitalize } from "./users";
import { loadingIndicator } from "./transactions";
import { dp } from "../../helper";
const { TabPane } = Tabs;
const { Option } = Select;

export const ALL_EVENTS = {
  BUYER_CONNECT: "waitingforsellertoaccept",
  DCA_GENERATED: "dcageneratedanddigitallysignedthecontract",
  BUYER_EVENT_ON_SELLER_ACCEPT: "payfirstadvanceandfinalizetrade",
  SELLER_EVENT_ON_SELLER_ACCEPT: "waitingforfirstadvanceandtradefinalized",
  SELLER_EVENT_ON_SECOND_INSTALLMENT: "waitingforsecondpayment",
  SELLER_EVENT_ON_FINAL_AMOUNT: "waitingforfinalpayment",
  ON_GOODS_READY: "goodsreadyfordispatch",
  BUYER_EVENTS_ON_GOODS_DELIVERED: "goodsdelivered",
  SELLER_EVENTS_ON_GOODS_DELIVERED: "goodsreceivedbythebuyer",
  BUYER_EVENT_ON_SELLER_REJECT: "identifyinganewseller(sellerrejected)",
  SELLER_EVENT_ON_SELLER_REJECT: "completed",
  TRANSACTION_COMPLETED: "transactioncompleted",
  BUYER_EVENT_ON_AUTO_REJECT:
    "yourtransactionisautorejectedsincetherewerenoactionstakenin48hrs!",
  SELLER_EVENT_ON_AUTO_REJECT:
    "sorrytransactionrejectedwewillfindanewmatchtoyou",
};
const PK_FILTER = "pk";
const PRODUCE_FILTER = "produce";
const SELLER_FINAL_PRICE_FILTER = "seller_final_price";
const MATCHED_QUANTITY_FILTER = "matched_quantity";
const EVENT_LATEST = "event_latest";
const BUYER_ID_FILTER = "buyer_id";
const GSI_FILTER = "gsi";
const SELLER_ID_FILTER = "buyer_id";

interface seller {
  pk: string;
  gsi_status: any;
  produce: string;
  buyer_final_price: string;
  matched_quantity: string;
  gsi: string;
  buyer_id: any;
  event_latest: any;
  created_at: string;
  events: [];
  seller_final_price: string;
  buyer_location: string;
  seller_location: string;
  seller_id: string;
}

function App() {
  const [allFilters, setAllFilters] = useState({
    pk: "",
    event_latest: "",
    produce: "",
    seller_final_price: [0, 9999900000],
    matched_quantity: [0, 9999900000],
    gsi: "",
    buyer_id: "",
    seller_id: "",
    seller_location: "",
    buyer_final_price: [0, 9999900000],
  });
  const {
    Seller_data,
    Buyer_data,
    produces,
    seller_quantity_range,
    buyer_quantity_range,
    seller_transaction_range,
    buyer_transaction_range,
  } = useSelector((state: RootState) => state.main.transactionData);
  const { foDetails } = useSelector((state: RootState) => state.main);
  console.log(Buyer_data);

  const initSellerData: Array<ISellerTransaction> = [];
  const initBuyerData: Array<IBuyerTransaction> = [];

  const [filteredSellerData, setFilteredSellerData] = useState(initSellerData);
  const [filteredBuyerData, setFilteredBuyerData] = useState(initBuyerData);

  const [isFiltering, setIsFiltering] = useState(false);
  const [tabNo, setTabNo] = useState( foDetails.assigned_user_type == "buyer" ? 2 : 1);

  const updateAllFilters = (grp: string, val: string) => {
    if (val === "undefined") val = "";
    val = val.toLowerCase();
    let currFilter: Record<string, string> = {};
    currFilter[`${grp}`] = val;
    setAllFilters((prevState) => {
      const f = { ...prevState, ...currFilter };
      return f;
    });
  };

  dp(isFiltering);
  dp("IS FILETERING VALUE");
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

    let finalFilteredSellerData: Array<seller> = [];

    let finalFilteredBuyerData: Array<seller> = [];

    const noEmptyVal = (v: string) => {
      if (!Boolean(v)) return "`";
      return v;
    };
    let allData: any = Seller_data;

    if (tabNo == 2) allData = Buyer_data;

    allData.forEach((item: seller) => {
      if (isNestedFilter) {
        let include = false;
        if (
          item.gsi &&
          item.gsi.toLowerCase().includes(allFilters.gsi) &&
          item.pk &&
          item.pk.toLowerCase().includes(allFilters.pk) &&
          item.produce &&
          item.produce.toLowerCase().includes(allFilters.produce) &&
          item.matched_quantity &&
          parseInt(item.matched_quantity) >= allFilters.matched_quantity[0] &&
          item.matched_quantity &&
          parseInt(item.matched_quantity) <= allFilters.matched_quantity[1]
        )
          include = true;

        if (tabNo == 1) {
          if (
            item.seller_final_price &&
            parseInt(item.seller_final_price) >=
              allFilters.seller_final_price[0] &&
            item.seller_final_price &&
            parseInt(item.seller_final_price) <=
              allFilters.seller_final_price[1] &&
            ((item.buyer_id &&
              item.buyer_id.toLowerCase().includes(allFilters.buyer_id)) ||
              (item.buyer_location &&
                item.buyer_location
                  .toLowerCase()
                  .includes(allFilters.buyer_id))) &&
            include
          ) {
            finalFilteredSellerData.push(item);
          }
        } else {
          if (
            item.buyer_final_price &&
            parseInt(item.buyer_final_price) >=
              allFilters.buyer_final_price[0] &&
            item.buyer_final_price &&
            parseInt(item.buyer_final_price) <=
              allFilters.buyer_final_price[1] &&
            ((item.seller_id &&
              item.seller_id.toLowerCase().includes(allFilters.seller_id)) ||
              (item.seller_location &&
                item.seller_location
                  .toLowerCase()
                  .includes(allFilters.seller_id))) &&
            include
          ) {
            finalFilteredBuyerData.push(item);
          }
        }
      } else {
        let include = false;
        if (
          (item.gsi &&
            item.gsi.toLowerCase().includes(noEmptyVal(allFilters.gsi))) ||
          (item.pk && item.pk.includes(noEmptyVal(allFilters.pk))) ||
          (item.produce &&
            item.produce
              .toLowerCase()
              .includes(noEmptyVal(allFilters.produce))) ||
          (item.matched_quantity &&
            parseInt(item.matched_quantity) >= allFilters.matched_quantity[0] &&
            item.matched_quantity &&
            parseInt(item.matched_quantity) <= allFilters.matched_quantity[1])
        ) {
          include = true;
        }
        if (tabNo == 1) {
          if (
            (item.seller_final_price &&
              parseInt(item.seller_final_price) >=
                allFilters.seller_final_price[0] &&
              item.seller_final_price &&
              parseInt(item.seller_final_price) <=
                allFilters.seller_final_price[1]) ||
            (item.buyer_id &&
              item.buyer_id
                .toLowerCase()
                .includes(noEmptyVal(allFilters.buyer_id))) ||
            (item.buyer_location &&
              item.buyer_location
                .toLowerCase()
                .includes(noEmptyVal(allFilters.buyer_id))) ||
            include
          ) {
            finalFilteredSellerData.push(item);
          }
        } else {
          if (
            (item.buyer_final_price &&
              parseInt(item.buyer_final_price) >=
                allFilters.buyer_final_price[0] &&
              item.buyer_final_price &&
              parseInt(item.buyer_final_price) <=
                allFilters.buyer_final_price[1]) ||
            (item.seller_id &&
              item.seller_id
                .toLowerCase()
                .includes(noEmptyVal(allFilters.seller_id))) ||
            (item.seller_location &&
              item.seller_location
                .toLowerCase()
                .includes(noEmptyVal(allFilters.seller_id))) ||
            include
          ) {
            finalFilteredBuyerData.push(item);
          }
        }
      }
    });

    // To remove any duplicates, If created at is same,
    // Then we can be sure that it is a duplicate record we added in the list
    // Got it from stackoverflow :P
    // finalFilteredData = finalFilteredData.filter(
    //     (value, index, self) =>
    //         index === self.findIndex((t) => t.created_at === value.created_at)
    // );

    console.log(finalFilteredSellerData);

    setIsFiltering(true);
    if (tabNo == 1) {
      setFilteredSellerData(finalFilteredSellerData);
    } else {
      setFilteredBuyerData(finalFilteredBuyerData);
    }
  };

  const [isCFilterVisible, setIsCFilterVisible] = useState(false);

  // const myMenu = (
  //   <Menu
  //     style={{
  //       maxWidth: "500px",
  //     }}
  //   >
  //     <Menu.Item>
  //       <Checkbox.Group
  //         style={{ width: "100%" }}
  //         onChange={(val) => {
  //           console.log(val);
  //         }}
  //       >
  //         <Row justify="space-between" align="middle">
  //           <Col>
  //             <Typography.Paragraph strong>Status</Typography.Paragraph>
  //           </Col>
  //           {/* <Col>
  //             <Checkbox value="selectall">Select all</Checkbox>
  //           </Col> */}
  //         </Row>
  //         <Space wrap>
  //           {Object.keys(ALL_EVENTS)
  //             .slice(0, 2)
  //             .map((item) => {
  //               return (
  //                 <Col span={8}>
  //                   <Checkbox value={item}>{item}</Checkbox>
  //                 </Col>
  //               );
  //             })}
  //         </Space>
  //       </Checkbox.Group>
  //       <br />
  //     </Menu.Item>
  //     <Menu.Item>
  //       <Checkbox.Group
  //         style={{ width: "100%" }}
  //         onChange={(val) => {
  //           console.log(val);
  //         }}
  //       >
  //         <Row justify="space-between" align="middle">
  //           <Col>
  //             <Typography.Paragraph strong>
  //               Ongoing Transactions
  //             </Typography.Paragraph>
  //           </Col>
  //           {/* <Col>
  //             <Checkbox value="selectall">Select all</Checkbox>
  //           </Col> */}
  //         </Row>
  //         <Space wrap>
  //           {Object.keys(ALL_EVENTS)
  //             .slice(2, 9)
  //             .map((item) => {
  //               return (
  //                 <Col span={8}>
  //                   <Checkbox value={item}>{item}</Checkbox>
  //                 </Col>
  //               );
  //             })}
  //         </Space>
  //         {/* <Row justify="start" gutter={[6, 6]}>
  //           {
  //             // [
  //             //   "Produce Booked",
  //             //   "Transported Assigned",
  //             //   "Produce Picked",
  //             //   "Second Payment Received",
  //             //   "In Transit",
  //             //   "Produce Delivered",
  //             //   "Final Payment Received",
  //             // ]
  //             Object.keys(ALL_EVENTS).map((item) => {
  //               return (
  //                 <Col span={8}>
  //                   <Checkbox value={item}>{item}</Checkbox>
  //                 </Col>
  //               );
  //             })
  //           }
  //         </Row> */}
  //       </Checkbox.Group>
  //       <br />
  //     </Menu.Item>
  //     <Menu.Item>
  //       <Checkbox.Group
  //         style={{ width: "100%" }}
  //         onChange={(val) => {
  //           console.log(val);
  //         }}
  //       >
  //         <Row justify="space-between" align="middle">
  //           <Col>
  //             <Typography.Paragraph strong>
  //               Completed Transactions
  //             </Typography.Paragraph>
  //           </Col>
  //           {/* <Col>
  //             <Checkbox value="selectall">Select all</Checkbox>
  //           </Col> */}
  //         </Row>
  //         <Space wrap>
  //           {Object.keys(ALL_EVENTS)
  //             .slice(9, Object.keys(ALL_EVENTS).length)
  //             .map((item) => {
  //               return (
  //                 <Col span={8}>
  //                   <Checkbox value={item}>{item}</Checkbox>
  //                 </Col>
  //               );
  //             })}
  //         </Space>
  //       </Checkbox.Group>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <Row justify="end" gutter={[6, 0]}>
  //         <Col>
  //           <Button type="text">Reset</Button>
  //         </Col>
  //         <Col>
  //           <Button type="primary">Apply</Button>
  //         </Col>
  //       </Row>
  //     </Menu.Item>
  //   </Menu>
  // );
  const expandedRowRender = (
    passedData: IBuyerTransaction | ISellerTransaction,
    ind: any
  ) => {
    const data = passedData.events;

    return (
      <Row>
        <Col>
          <Divider plain orientation="left">
            <Typography.Title level={5}>Transaction Events</Typography.Title>
          </Divider>
        </Col>
        <Col span={24} className="ml100">
          {data.length === 0 ? (
            <Typography.Text strong>No Events to show</Typography.Text>
          ) : null}
          <Timeline>
            {data.map((event: any) => {
              return (
                <Timeline.Item>
                  <Typography.Text strong>
                    {event.event_description}&nbsp;
                  </Typography.Text>
                  on &nbsp;
                  {new Date(event.event_timestamp).toLocaleString()}
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Col>
      </Row>
    );
  };
  const myMenu = (
    <Menu
      style={{
        maxWidth: "500px",
        // paddingTop:3dd 20,
        // paddingLeft: 10,
        // paddingRight: 10,
      }}
    >
      <Menu.Item>
        <Checkbox.Group style={{ width: "100%" }} onChange={() => {}}>
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Paragraph strong>
                Pending Transactions
              </Typography.Paragraph>
            </Col>
            <Col>
              <Checkbox value="selectall">Select all</Checkbox>
            </Col>
          </Row>
          <Row justify="start" gutter={[6, 6]}>
            {[
              "Pending",
              "Seller Accepted",
              "One more",
              "Details",
              "Select All",
            ].map((item) => {
              return (
                <Col span={8}>
                  <Checkbox value={item}>{item}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
        <br />
      </Menu.Item>
      <Menu.Item>
        <Checkbox.Group style={{ width: "100%" }} onChange={() => {}}>
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Paragraph strong>
                Pending Transactions
              </Typography.Paragraph>
            </Col>
            <Col>
              <Checkbox value="selectall">Select all</Checkbox>
            </Col>
          </Row>
          <Row justify="start" gutter={[6, 6]}>
            {[
              "Produce Booked",
              "Transported Assigned",
              "Produce Picked",
              "Second Payment Received",
              "In Transit",
              "Produce Delivered",
              "Final Payment Received",
              "Select All",
            ].map((item) => {
              return (
                <Col span={8}>
                  <Checkbox value={item}>{item}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
        <br />
      </Menu.Item>
      <Menu.Item>
        <Checkbox.Group style={{ width: "100%" }} onChange={() => {}}>
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Paragraph strong>
                Pending Transactions
              </Typography.Paragraph>
            </Col>
            <Col>
              <Checkbox value="selectall">Select all</Checkbox>
            </Col>
          </Row>
          <Row justify="start" gutter={[6, 6]}>
            {["Completed"].map((item) => {
              return (
                <Col span={8}>
                  <Checkbox value={item}>{item}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      </Menu.Item>
      <Menu.Item>
        <Row justify="end" gutter={[6, 0]}>
          <Col>
            <Button type="text">Reset</Button>
          </Col>
          <Col>
            <Button type="primary">Apply</Button>
          </Col>
        </Row>
      </Menu.Item>
    </Menu>
  );

  const quantitySelector = (range: any) => {
    if (!range) return;
    setAllFilters((prevState) => {
      const f = { ...prevState, matched_quantity: range };
      return f;
    });
  };
  const bfpSelector = (range: any) => {
    if (!range) return;
    setAllFilters((prevState) => {
      const f = { ...prevState, buyer_final_price: range };
      return f;
    });
  };
  const sfpSelector = (range: any) => {
    if (!range) return;
    setAllFilters((prevState) => {
      const f = { ...prevState, seller_final_price: range };
      return f;
    });
  };
  console.log(foDetails.assigned_user_type);

  const tags1V2 = (
    <>
      <Typography.Paragraph>Status</Typography.Paragraph>
      <Dropdown
        overlay={myMenu}
        placement="bottomCenter"
        arrow
        visible={isCFilterVisible}
      >
        <Button
          onClick={() => {
            setIsCFilterVisible(!isCFilterVisible);
          }}
        >
          Select <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );

  const CSellerColumns: ColumnsType<ISellerTransaction> = [
    {
      title: (
        <Row>
          <Col span={24}>ID</Col>
          <Col span={24}>
            <Input
              className="filters"
              placeholder="Search"
              allowClear
              onChange={(val) => updateAllFilters(PK_FILTER, val.target.value)}
            />
          </Col>
        </Row>
      ),
      dataIndex: "pk",
      key: "pk",
      render: (val: string) => {
        return (
          <>
            <Tooltip title={val}>
              <span>
                {val.slice(val.indexOf("#") + 1, val.indexOf("#") + 10)}..
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: tags1V2,
      render: (con, i: any) => {
        return (
          <>
            {i["gsi_status"] == undefined && <>---</>}
            {i["gsi_status"] && (
              <p className={i["gsi_status"]}>{capitalize(i["gsi_status"])}</p>
            )}
            {i["event_latest"] == undefined && <>---</>}
            {i["event_latest"] && <>{i["event_latest"]}</>}
          </>
        );
      },
    },

    {
      title: (
        <Row>
          <Col span={24}>Produce</Col>
          <Col span={24}>
            <Select
              className="filters"
              placeholder="Select"
              allowClear
              onChange={(val) => updateAllFilters(PRODUCE_FILTER, `${val}`)}
            >
              {produces.seller.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),

      dataIndex: "produce",
      key: "produce",
    },
    {
      title: (
        <RangeSelector
          name="Transaction Value"
          min={seller_transaction_range?.min ?? 0}
          max={seller_transaction_range?.max ?? 90000}
          onSubmit={sfpSelector}
        />
      ),
      dataIndex: "seller_final_price",
      key: "seller_final_price",

      render: (seller_final_price: string) => <>₹{seller_final_price}</>,
    },
    {
      title: (
        <RangeSelector
          name="Quantity"
          min={seller_quantity_range?.min ?? 0}
          max={seller_quantity_range?.max ?? 0}
          onSubmit={quantitySelector}
        />
      ),
      dataIndex: "matched_quantity",
      key: "matched_quantity",
      render: (matched_quantity: string) => <>{matched_quantity}qtl</>,
    },

    {
      title: (
        <Row>
          <Col span={24}>Seller ID</Col>
          <Col span={24}>
            <Input
              className="filters"
              placeholder="Search"
              allowClear
              onChange={(val) => updateAllFilters(GSI_FILTER, val.target.value)}
            />
          </Col>
        </Row>
      ),
      dataIndex: "gsi",
      key: "gsi",
      render: (SellerID: string) => <p key={SellerID}>{SellerID}</p>,
    },

    {
      title: (
        <Row>
          <Col span={24}>Buyer</Col>
          <Col span={24}>
            <Input
              className="filters"
              placeholder="Search"
              allowClear
              onChange={(val) =>
                updateAllFilters(BUYER_ID_FILTER, val.target.value)
              }
            />
          </Col>
        </Row>
      ),
      dataIndex: ["buyer_id", "buyer_location"],
      key: "buyer_id",
      render: (_buyer, i) => (
        <>
          <Typography.Paragraph>{i["buyer_id"]}</Typography.Paragraph>
          <Typography.Paragraph>{i["buyer_location"]}</Typography.Paragraph>
        </>
      ),
    },
  ];

  const CBuyerColumns: ColumnsType<IBuyerTransaction> = [
    {
      title: (
        <Row>
          <Col span={24}>ID</Col>
          <Col span={24}>
            <Input
              className="filters"
              placeholder="Search"
              allowClear
              onChange={(val) => updateAllFilters(PK_FILTER, val.target.value)}
            />
          </Col>
        </Row>
      ),
      dataIndex: "pk",
      key: "created_at",
      render: (val: string) => {
        return (
          <>
            <Tooltip title={val}>
              <span>
                {val.slice(val.indexOf("#") + 1, val.indexOf("#") + 10)}..
              </span>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: ["gsi_status", "event_latest"],
      key: "gsi_status",
      render: (con, i: any) => {
        return (
          <>
            {i["gsi_status"] == undefined && <>---</>}
            {i["gsi_status"] && (
              <p className={i["gsi_status"]}>{capitalize(i["gsi_status"])}</p>
            )}
            {i["event_latest"] == undefined && <>---</>}

            {i["event_latest"] && <>{i["event_latest"]}</>}
          </>
        );
      },
    },

    {
      title: (
        <Row>
          <Col span={24}>Produce</Col>
          <Col span={24}>
            <Select
              className="filters"
              placeholder="Select"
              allowClear
              onChange={(val) => updateAllFilters(PRODUCE_FILTER, `${val}`)}
            >
              {produces.buyer.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      dataIndex: "produce",
      key: "produce",
    },
    {
      title: (
        <RangeSelector
          name="Transaction Value"
          min={buyer_transaction_range?.min ?? 0}
          max={buyer_transaction_range?.max ?? 90000}
          onSubmit={bfpSelector}
        />
      ),
      dataIndex: "buyer_final_price",
      key: "buyer_final_price",

      render: (buyer_final_price: string) => <>₹{buyer_final_price}</>,
    },
    {
      title: (
        <RangeSelector
          name="Quantity"
          min={buyer_quantity_range?.min ?? 0}
          max={buyer_quantity_range?.max ?? 0}
          onSubmit={quantitySelector}
        />
      ),
      dataIndex: "matched_quantity",
      key: "matched_quantity",

      render: (matched_quantity: string) => <>{matched_quantity}qtl</>,
    },

    {
      title: (
        <Row>
          <Col span={24}>Buyer ID</Col>
          <Col span={24}>
            <Input
              className="filters"
              placeholder="Search"
              allowClear
              onChange={(val) => updateAllFilters(GSI_FILTER, val.target.value)}
            />
          </Col>
        </Row>
      ),
      dataIndex: "gsi",
      key: "gsi",
      render: (BuyerID: string) => (
        <Typography.Paragraph key={BuyerID}>{BuyerID}</Typography.Paragraph>
      ),
    },
    {
      title: (
        <Row>
          <Col span={24}>Seller</Col>
          <Col span={24}>
            <Input
              className="filters"
              placeholder="Search"
              allowClear
              onChange={(val) =>
                updateAllFilters(SELLER_ID_FILTER, val.target.value)
              }
            />
          </Col>
        </Row>
      ),
      dataIndex: ["seller_id", "seller_location"],
      key: "seller_id",
      render: (_seller, i) => (
        <>
          <Typography.Paragraph>{i["seller_id"]}</Typography.Paragraph>
          <Typography.Paragraph>{i["seller_location"]}</Typography.Paragraph>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="match card-container">
        <Typography.Title level={4} className="title">
          Transactions
        </Typography.Title>
        <Space> </Space>
        <Tabs
          type="card"
          className="cardd"
          onChange={(val) => {
            // if (foDetails.assigned_user_type == "buyer") {
            //   setTabNo(parseInt(val) + 1);
            // } else {
              setTabNo(parseInt(val));
            // }
            setIsFiltering(false);
          }}
        >
          {foDetails.assigned_user_type != "buyer" && (
            <TabPane tab="Seller Transactions" key="1">
              {Seller_data == undefined ? (
                loadingIndicator
              ) : (
                <>
                  <div className="mb5 mt5">
                    <Row>
                      <Col
                        xs={{ span: 8 }}
                        sm={{ span: 12 }}
                        lg={{ span: 16 }}
                        md={{ span: 14 }}
                      ></Col>
                      <Col
                        xs={{ span: 8 }}
                        sm={{ span: 6 }}
                        lg={{ span: 4 }}
                        md={{ span: 5 }}
                      >
                        <Checkbox>View All Issues</Checkbox>
                      </Col>
                      <Col
                        xs={{ span: 8 }}
                        sm={{ span: 6 }}
                        lg={{ span: 4 }}
                        md={{ span: 5 }}
                      >
                        <Checkbox>Clear All Filters</Checkbox>
                      </Col>
                    </Row>
                  </div>
                  <Table<ISellerTransaction>
                    rowKey={(record) => record.created_at}
                    size="small"
                    expandable={{ expandedRowRender }}
                    columns={CSellerColumns}
                    dataSource={isFiltering ? filteredSellerData : Seller_data}
                    pagination={{ position: ["bottomLeft"], pageSize: 8 }}
                    scroll={{ x: 1350 }}
                    rowClassName={(record, index) =>
                      record.gsi_status ? "b" + record.gsi_status : ""
                    }
                  />
                </>
              )}
            </TabPane>
          )}
          {foDetails.assigned_user_type != "seller" && (
            <TabPane tab="Buyer Transactions" key="2" className="buyer">
              {/* 1100*/}
              <div className="mb5 mt5">
                <Row>
                  <Col
                    xs={{ span: 8 }}
                    sm={{ span: 12 }}
                    lg={{ span: 16 }}
                    md={{ span: 14 }}
                  ></Col>
                  <Col
                    xs={{ span: 8 }}
                    sm={{ span: 6 }}
                    lg={{ span: 4 }}
                    md={{ span: 5 }}
                  >
                    <Checkbox>View All Issues</Checkbox>
                  </Col>
                  <Col
                    xs={{ span: 8 }}
                    sm={{ span: 6 }}
                    lg={{ span: 4 }}
                    md={{ span: 5 }}
                  >
                    <Checkbox>Clear All Filters</Checkbox>
                  </Col>
                </Row>
              </div>
              {/*  media scrns <830 px */}
              {/* <div className="mb20 mt5">
              <Row>
                <Col span={10}></Col>
                <Col span={7}>
                  <Checkbox>View All Issues</Checkbox>
                </Col>
                <Col span={7}>
                  <Checkbox>Clear All Filters</Checkbox>
                </Col>
              </Row>
            </div> */}
              {Buyer_data == undefined
                ? loadingIndicator
                : Buyer_data && (
                    <Table<IBuyerTransaction>
                      rowKey={(record) => record.created_at}
                      size="small"
                      expandable={{ expandedRowRender }}
                      columns={CBuyerColumns}
                      dataSource={isFiltering ? filteredBuyerData : Buyer_data}
                      pagination={{ position: ["bottomLeft"], pageSize: 8 }}
                      scroll={{ x: 1350 }}
                      rowClassName={(record, index) =>
                        record.gsi_status ? "b" + record.gsi_status : ""
                      }
                    />
                  )}
            </TabPane>
          )}
        </Tabs>
      </div>
    </>
  );
}

export default App;
