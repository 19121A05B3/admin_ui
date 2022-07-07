/* eslint-disable react/no-direct-mutation-state */
import "antd/dist/antd.css";
import { Tabs, Table, Typography, Space, Select, Input, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ModalDemo from "./ModalDemo";
import TransactionList from "./TransactionList";
import IdCard from "./IDCard";
import BuyerTable from "./buyer";
import { capitalize } from "./users";
import { loadingIndicator } from "./transactions";
import MatchesList from "./matchesList";

const { TabPane } = Tabs;
const { Option } = Select;
interface seller {
  pk: string;
  name: any;
  seller_type: any;
  phone_no: any;
  address1: any;
  address2: any;
  buyer_type: any;
}
const PK_FILTER = "pk";
const NAME_FILTER = "name";
const SELLER_TYPE_FILTER = "seller_type";
const PHONE_NO_FILTER = "phone_no";
const ADDRESS_FILTER = "address1";
export function getKeyByValue(object: any, value: any) {
  return Object.keys(object).find((key) => object[key] === value);
}
function App() {
  const { Seller, user_types } = useSelector(
    (state: RootState) => state.main.vbUserData
  );
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  // const { user_types } = useSelector(
  //   (state: RootState) => state.main.vbUserData
  // );
  // const Seller = [
  //   {
  //     buyer_type: "",
  //     is_seller: true,
  //     zip: "583239",
  //     phone_no: "9740751099",
  //     email: "sunil@gmail.com",
  //     name: "Sunil",
  //     seller_type: "farmer",
  //     consent: true,
  //     assignedfieldofficer: "admin#9392024242",
  //     state: "Karnataka",
  //     taluk: "Hospet",
  //     district: "Bellary",
  //     UIDAI: "",
  //     sk: "profile",
  //     is_buyer: false,
  //     pk: "user#9740751099",
  //     PAN: "",
  //     address1: "# 129/B Aditya nagar",
  //     address2: "Hospet, Bellary, Karnataka",
  //   },
  // ];
  const { Individual_Produces } = useSelector(
    (state: RootState) => state.main.produceData
  );
  const transaction_list = useSelector(
    (state: RootState) => state.main.transactionData.Individual_Transactions
  );
  const matches_list = useSelector(
    (state: RootState) => state.main.transactionData.Individual_matches
  );
  const { Issues_Individual } = useSelector(
    (state: RootState) => state.main.actionsTabData
  );
  const { foDetails } = useSelector((state: RootState) => state.main);

  // const [selectorValues, setSelectorValues] = useState({
  //   seller_type: [""],
  //   // buyer_type: [""]
  // });

  const [allFilters, setAllFilters] = useState({
    pk: "",
    name: "",
    seller_type: "",
    phone_no: "",
    address1: "",
    buyer_type: "",
  });

  const [filteredData, setFilteredData] = useState([{}]);
  const [isFiltering, setIsFiltering] = useState(false);
  const updateAllFilters = (grp: string, val: string) => {
    if (val === "undefined" || val === undefined) val = "";
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

      let finalFilteredData: Array<seller> = [];

      const noEmptyVal = (v: string) => {
        if (!Boolean(v)) return "`";
        return v;
      };
      let allData: any = Seller;
      allData.forEach((item: seller) => {
        if (isNestedFilter) {
          if (
            item.pk &&
            item.pk.toLowerCase().includes(allFilters.pk) &&
            item.name &&
            item.name.toLowerCase().includes(allFilters.name) &&
            item.seller_type &&
            item.seller_type.toLowerCase().includes(allFilters.seller_type) &&
            item.phone_no &&
            item.phone_no.toLowerCase().includes(allFilters.phone_no) &&
            ((item.address1 &&
              item.address1.toLowerCase().includes(allFilters.address1)) ||
              (item.address2 &&
                item.address2.toLowerCase().includes(allFilters.address1)))
            // item.buyer_type.includes(allFilters.buyer_type)
          )
            finalFilteredData.push(item);
        } else {
          if (
            (item.pk && item.pk.includes(noEmptyVal(allFilters.pk))) ||
            (item.name &&
              item.name.toLowerCase().includes(noEmptyVal(allFilters.name))) ||
            (item.seller_type &&
              item.seller_type
                .toLowerCase()
                .includes(noEmptyVal(allFilters.seller_type))) ||
            (item.phone_no &&
              item.phone_no.includes(noEmptyVal(allFilters.phone_no))) ||
            (item.address1 &&
              item.address1
                .toLowerCase()
                .includes(noEmptyVal(allFilters.address1))) ||
            (item.address2 &&
              item.address2
                .toLowerCase()
                .includes(noEmptyVal(allFilters.address1)))
            //    ||
            //   item.buyer_type.includes(noEmptyVal(allFilters.buyer_type))
          )
            finalFilteredData.push(item);
        }
      });

      setIsFiltering(true);
      setFilteredData(finalFilteredData);
    };

    // Everytime the filters change, Need to do filtering... so
    doFilterV2();
  }, [allFilters]);

  const sellerColumns = [
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
          <Col span={24}>Name</Col>
          <Col span={24}>
            <Input
              className="filters"
              placeholder="Search"
              allowClear
              onChange={(val) =>
                updateAllFilters(NAME_FILTER, val.target.value)
              }
            />
          </Col>
        </Row>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <Row>
          <Col span={24}>Type</Col>
          <Col span={24} className="filters">
            <Select
              placeholder="Select"
              allowClear
              onChange={(val) => updateAllFilters(SELLER_TYPE_FILTER, `${val}`)}
            >
              {user_types.seller.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      dataIndex: "seller_type",
      key: "seller_type",
      render: (st: any) => capitalize(st),
    },
    {
      title: (
        <Row>
          <Col span={24}>Contact</Col>
          <Col span={24}>
            <Input
              className="filters"
              placeholder="Search"
              allowClear
              onChange={(val) =>
                updateAllFilters(PHONE_NO_FILTER, val.target.value)
              }
            />
          </Col>
        </Row>
      ),
      dataIndex: "phone_no",
      key: "phone_no",
    },
    {
      title: (
        <Row>
          <Col span={24}>Address</Col>
          <Col span={24}>
            <Input
              className="filters"
              placeholder="Search"
              allowClear
              onChange={(e) => updateAllFilters(ADDRESS_FILTER, e.target.value)}
            />
          </Col>
        </Row>
      ),
      key: "address1",
      dataIndex: ["address1", "address2"],
      render: (add: any, i: any) => (
        <>
          <>{i["address1"]}</>
          <br></br>
          <>{i["address2"]}</>
        </>
      ),
    },

    {
      title: "More Information",
      dataIndex: "modals",
      render: (_modals: any, i: { [x: string]: string }) => (
        <>
          <div className="info">
            <ModalDemo
              seller_id={i["pk"]}
              name={i["name"]}
              produce_list={Individual_Produces}
              issues={0}
              is_seller={1}
            />
            <MatchesList
              seller_id={i["pk"]}
              name={i["name"]}
              matches_list={matches_list}
              seller={1}
            />
            <TransactionList
              seller_id={i["pk"]}
              name={i["name"]}
              transaction_list={transaction_list}
              seller={1}
            />{" "}
            <IdCard seller_id={i["pk"]} name={i["name"]} type={"seller"} />
            {/* <a
              key="idCard"
              onClick={() => idRequest(i["pk"], "seller", i["name"])}
            >
              ID Card
            </a> */}
          </div>
        </>
      ),
    },
    {
      title: "Issues",
      dataIndex: "issues",
      render: (_issues: any, i: any) => (
        <>
          <div className="info">
            <ModalDemo
              seller_id={i["pk"]}
              name={i["name"]}
              produce_list={Issues_Individual}
              issues={1}
              is_seller={1}
            />
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="match card-container">
      <Typography.Title level={4} className="title">
        Users
      </Typography.Title>
      <Space> </Space>

      <Tabs type="card" className="card">
        {foDetails.assigned_user_type !== "buyer" && (
          <TabPane tab="Seller" key="1">
            {Seller === undefined || Seller.length === 0 ? (
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
                    ></Col>
                    <Col
                      xs={{ span: 8 }}
                      sm={{ span: 6 }}
                      lg={{ span: 4 }}
                      md={{ span: 5 }}
                    >
                      {/* <Checkbox onChange={(val: CheckboxChangeEvent) => {}}>
                        View All Issues
                      </Checkbox> */}
                    </Col>
                  </Row>
                </div>
                <Table
                  columns={sellerColumns}
                  dataSource={isFiltering ? filteredData : Seller}
                  pagination={{ position: ["bottomLeft"], pageSize: 8 }}
                  scroll={{ x: 1350 }}
                />
              </>
            )}
          </TabPane>
        )}
        {foDetails.assigned_user_type !== "seller" && (
          <TabPane tab="Buyer" key="2">
            <BuyerTable />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
}
export default App;
