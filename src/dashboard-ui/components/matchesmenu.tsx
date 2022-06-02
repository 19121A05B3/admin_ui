import "antd/dist/antd.css";
import {
  Tabs,
  Table,
  Typography,
  Space,
  Input,
  Select,
  Tooltip,
  Row,
  Col,
} from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { RangeSelector } from "../../components/common/range_selector";
import { loadingIndicator } from "./transactions";
import { getKeyByValue } from "./usersmenu";

const { TabPane } = Tabs;
const { Option } = Select;
interface User {
  pk: string;
  produce: string;
  matched_quantity: string;
  dayssinceadded: Number;
  buyer_location: string;
  buyer_id: string;
  gsi: string;
  created_at: Date;
  seller_final_price: string;
  askingdeliverydate: Date;
}
const PK_FILTER = "pk";
const BUYER_ID_FILTER = "buyer_id";
const PRODUCE_FILTER = "produce";
const GSI_FILTER = "gsi";

function App(this: any) {
  const {
    Seller_matches,
    match_produces,
    match_transaction_range,
    match_quantity_range,
  } = useSelector((state: RootState) => state.main.transactionData);
  const { foDetails } = useSelector((state: RootState) => state.main);
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  // const handleDateChange = (date: any) => {
  //   if (date) {
  //     const currentDateInSeconds = new Date().getTime();
  //     const dd = new Date(date);
  //     const selectedDateInSeconds = dd.getTime();
  //     const timeDifference = currentDateInSeconds - selectedDateInSeconds;
  //     let timeDifferenceInDays = timeDifference / (1000 * 60 * 60 * 24);
  //     if (timeDifferenceInDays > 0 && timeDifferenceInDays < 1) {
  //       timeDifferenceInDays = 1;
  //     }
  //     timeDifferenceInDays = Math.ceil(timeDifferenceInDays);
  //     return timeDifferenceInDays.toString();
  //   }
  // };
  const [allFilters, setAllFilters] = useState({
    pk: "",
    produce: "",
    matched_quantity: [0, 9999900000],
    seller_final_price: [0, 9999900000],
    gsi: "",
    buyer_id: "",
  });

  const [filteredData, setFilteredData] = useState([{}]);
  const [isFiltering, setIsFiltering] = useState(false);
  const updateAllFilters = (grp: string, val: string) => {
    var h = val;
    if (val === "undefined" || val === undefined) val = "";
    if (grp == "gsi" && val != "") {
      console.log(val);
      console.log(getKeyByValue(user_destiny_data, val));
      val = val.toUpperCase();
      var c: any = getKeyByValue(user_destiny_data, val);
      if (c === "undefined" || c === undefined) val = "###^&*(^&*";
      else val = c;
      console.log(val);
    }
    if ((grp == "buyer_id" && val != "") || (grp == "seller_id" && val != "")) {
      console.log(val);
      console.log(getKeyByValue(user_destiny_data, val.toUpperCase()));
      var c: any = getKeyByValue(user_destiny_data, val.toUpperCase());
      if (c !== "undefined" || c !== undefined) val = c;
      if (c === "undefined" || c === undefined) val = h;
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

    let finalFilteredData: Array<User> = [];

    const noEmptyVal = (v: string) => {
      if (!Boolean(v)) return "`";
      return v;
    };
    let allData: any = Seller_matches;
    allData.forEach((item: User) => {
      if (isNestedFilter) {
        if (
          item.pk &&
          item.pk.toLowerCase().includes(allFilters.pk) &&
          item.gsi &&
          item.gsi.toLowerCase().includes(allFilters.gsi) &&
          item.produce &&
          item.produce.toLowerCase().includes(allFilters.produce) &&
          item.matched_quantity &&
          parseInt(item.matched_quantity) >= allFilters.matched_quantity[0] &&
          item.matched_quantity &&
          parseInt(item.matched_quantity) <= allFilters.matched_quantity[1] &&
          item.seller_final_price &&
          parseInt(item.seller_final_price) >=
            allFilters.seller_final_price[0] &&
          item.seller_final_price &&
          parseInt(item.seller_final_price) <=
            allFilters.seller_final_price[1] &&
          ((item.buyer_id &&
            item.buyer_id.toLowerCase().includes(allFilters.buyer_id)) ||
            (item.buyer_location &&
              item.buyer_location.toLowerCase().includes(allFilters.buyer_id)))
          // item.buyer_type.includes(allFilters.buyer_type)
        )
          finalFilteredData.push(item);
      } else {
        if (
          (item.pk && item.pk.includes(noEmptyVal(allFilters.pk))) ||
          (item.gsi && item.gsi.includes(noEmptyVal(allFilters.gsi))) ||
          (item.produce &&
            item.produce
              .toLowerCase()
              .includes(noEmptyVal(allFilters.produce))) ||
          (item.matched_quantity &&
            parseInt(item.matched_quantity) >= allFilters.matched_quantity[0] &&
            item.matched_quantity &&
            parseInt(item.matched_quantity) <=
              allFilters.matched_quantity[1]) ||
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
              .includes(noEmptyVal(allFilters.buyer_id)))
          //    ||
          //   item.buyer_type.includes(noEmptyVal(allFilters.buyer_type))
        )
          finalFilteredData.push(item);
      }
    });

    // To remove any duplicates, If created at is same,
    // Then we can be sure that it is a duplicate record we added in the list
    // Got it from stackoverflow :P
    // finalFilteredData = finalFilteredData.filter(
    //     (value, index, self) =>
    //         index === self.findIndex((t) => t.created_at === value.created_at)
    // );
    setIsFiltering(true);
    setFilteredData(finalFilteredData);
  };
  const quantitySelector = (range: any) => {
    if (!range) return;
    setAllFilters((prevState) => {
      const f = { ...prevState, matched_quantity: range };
      return f;
    });
  };

  const sellerfinalpriceSelector = (range: any) => {
    if (!range) return;
    setAllFilters((prevState) => {
      const f = { ...prevState, seller_final_price: range };
      return f;
    });
  };

  const columns = [
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
      title: (
        <Row>
          <Col span={24}>Produce-Variety-Grade</Col>
          <Col span={24} className="filters">
            <Select
              placeholder="Select"
              allowClear
              onChange={(val) => updateAllFilters(PRODUCE_FILTER, `${val}`)}
            >
              {match_produces.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      dataIndex: "produce",
    },
    {
      title: (
        <RangeSelector
          name="Transaction Value"
          min={match_transaction_range?.min ?? 0}
          max={match_transaction_range?.max ?? 90000}
          onSubmit={sellerfinalpriceSelector}
        />
      ),
      dataIndex: "seller_final_price",
      render: (tvalue: any[]) => <>₹{tvalue}</>,
    },
    {
      title: (
        <RangeSelector
          name="Quantity"
          min={match_quantity_range?.min ?? 0}
          max={match_quantity_range?.max ?? 90000}
          onSubmit={quantitySelector}
        />
      ),
      dataIndex: "matched_quantity",
      render: (quantity: any[]) => <>{quantity} qtl</>,
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
      render: (_buyer: any, i: any) => (
        <>
          {user_destiny_data[i["buyer_id"]] != "" ? (
            <>{user_destiny_data[i["buyer_id"]]}</>
          ) : (
            <>---</>
          )}
          <br></br>
          <>{i["buyer_location"]}</>
        </>
      ),
    },
    // {
    //   title: "Days Since Added",
    //   dataIndex: "created_at",
    //   render: (created_at: any) => handleDateChange(created_at),
    // },
    // {
    //   title: "Asking Delivery Date",
    //   dataIndex: "askingdeliverydate",
    //   key: "askingdeliverydate",
    //   render: (ad: any) => {
    //     return (
    //       <>
    //         {ad == undefined && <>---</>}
    //         {ad && <>{ad}</>}
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <div className="match card-container">
        <Typography.Title level={4} className="title">
          Matches
        </Typography.Title>
        <Space> </Space>
        <Tabs type="card" className="card">
          {foDetails.assigned_user_type !== "buyer" && (
            <TabPane tab="Seller Matches" key="1">
              {Seller_matches === undefined ? (
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
                        {/* <Checkbox>View All Issues</Checkbox> */}
                      </Col>
                      <Col
                        xs={{ span: 8 }}
                        sm={{ span: 6 }}
                        lg={{ span: 4 }}
                        md={{ span: 5 }}
                      >
                        {/* <Checkbox>Clear All Filters</Checkbox> */}
                      </Col>
                    </Row>
                  </div>
                  <Table
                    columns={columns}
                    dataSource={isFiltering ? filteredData : Seller_matches}
                    pagination={{ pageSize: 8, position: ["bottomLeft"] }}
                    scroll={{ x: 1350 }}
                  />
                </>
              )}
              {/* <Checkbox className="check">View All Issues</Checkbox>
            <Checkbox className="checkk" onChange={clearFilters}>
              Clear All Filters
            </Checkbox> */}
            </TabPane>
          )}
          {foDetails.assigned_user_type !== "seller" && (
            <TabPane tab="Buyer Matches" key="2">
              <div className="mb25"></div>

              <Table
                dataSource={[]}
                columns={columns}
                pagination={{ pageSize: 2, position: ["bottomLeft"] }}
                scroll={{ x: 1350 }}
              />
            </TabPane>
          )}
        </Tabs>
      </div>
    </>
  );
}
export default App;
