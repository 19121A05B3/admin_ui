import "antd/dist/antd.css";
import { Table, Select, Input, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ModalDemo from "./ModalDemo";
import TransactionList from "./TransactionList";
import IdCard from "./IDCard";
import { capitalize } from "./users";
import { loadingIndicator } from "./transactions";
import { getKeyByValue } from "./usersmenu";
import MatchesList from "./matchesList";

const { Option } = Select;
interface seller {
  pk: string;
  name: any;
  // seller_type: any;
  phone_no: any;
  address1: any;
  address2: any;
  buyer_type: any;
}
const PK_FILTER = "pk";
const NAME_FILTER = "name";
// const SELLER_TYPE_FILTER = "seller_type";
const PHONE_NO_FILTER = "phone_no";
const ADDRESS_FILTER = "address1";
const BUYER_TYPE_FILTER = "buyer_type";

function App() {
  const { Buyer, user_types } = useSelector(
    (state: RootState) => state.main.vbUserData
  );
  const matches_list = useSelector(
    (state: RootState) => state.main.transactionData.Individual_matches
  );
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  const { Individual_Produces } = useSelector(
    (state: RootState) => state.main.produceData
  );
  const transaction_list = useSelector(
    (state: RootState) => state.main.transactionData.Individual_Transactions
  );
  const { Issues_Individual } = useSelector(
    (state: RootState) => state.main.actionsTabData
  );
  // const [selectorValues, setSelectorValues] = useState({
  //   buyer_type: [""]
  // });
  console.log(Buyer);
  const [allFilters, setAllFilters] = useState({
    pk: "",
    name: "",
    phone_no: "",
    address1: "",
    buyer_type: "",
  });
  const [filteredData, setFilteredData] = useState([{}]);
  const [isFiltering, setIsFiltering] = useState(false);

  // useEffect(() => {
  //   // This one is to create all values for the selector fields, runs everytime ongoing data changes
  //   let buyer_type: Array<string> = [];

  //   Buyer.forEach((item: seller) => {
  //     if (!buyer_type.includes(item.buyer_type)) buyer_type.push(item.buyer_type);
  //   });
  //   setSelectorValues({
  //     buyer_type: buyer_type,
  //   });
  // }, [Buyer]);

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

  console.log(allFilters);
  useEffect(() => {
    // Everytime the filters change, Need to do filtering... so
    doFilterV2();
  }, [allFilters]);
  console.log(allFilters);

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
    let allData: any = Buyer;
    allData.forEach((item: seller) => {
      console.log("filtered");
      if (isNestedFilter) {
        if (
          item.pk &&
          item.pk.toLowerCase().includes(allFilters.pk) &&
          item.name &&
          item.name.toLowerCase().includes(allFilters.name) &&
          item.phone_no &&
          item.phone_no.toLowerCase().includes(allFilters.phone_no) &&
          ((item.address1 &&
            item.address1.toLowerCase().includes(allFilters.address1)) ||
            (item.address2 &&
              item.address2.toLowerCase().includes(allFilters.address1))) &&
          item.buyer_type &&
          item.buyer_type.toLowerCase().includes(allFilters.buyer_type)
        )
          finalFilteredData.push(item);
      } else {
        if (
          (item.pk && item.pk.includes(noEmptyVal(allFilters.pk))) ||
          (item.name &&
            item.name.toLowerCase().includes(noEmptyVal(allFilters.name))) ||
          (item.phone_no &&
            item.phone_no.includes(noEmptyVal(allFilters.phone_no))) ||
          (item.address1 &&
            item.address1
              .toLowerCase()
              .includes(noEmptyVal(allFilters.address1))) ||
          (item.address2 &&
            item.address2
              .toLowerCase()
              .includes(noEmptyVal(allFilters.address1))) ||
          (item.buyer_type &&
            item.buyer_type
              .toLowerCase()
              .includes(noEmptyVal(allFilters.buyer_type)))
        )
          finalFilteredData.push(item);
      }
    });
    console.log(finalFilteredData);

    // To remove any duplicates, If created at is same,
    // Then we can be sure that it is a duplicate record we added in the list
    // Got it from stackoverflow :P
    // finalFilteredData = finalFilteredData.filter(
    //     (value, index, self) =>
    //         index === self.findIndex((t) => t.created_at === value.created_at)
    // );
    setIsFiltering(true);
    setFilteredData(finalFilteredData);
    console.log(filteredData);
  };
  const buyerColumns = [
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
              onChange={(val) => updateAllFilters(BUYER_TYPE_FILTER, `${val}`)}
            >
              {user_types.buyer.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      dataIndex: "buyer_type",
      key: "buyer_type",
      render: (bt: any) => capitalize(bt),
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
          <p>{i["address1"]}</p>
          <p>{i["address2"]}</p>
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
              is_seller={0}
            />
            <MatchesList
              seller_id={i["pk"]}
              name={i["name"]}
              matches_list={matches_list}
              seller={0}
            />{" "}
            <TransactionList
              seller_id={i["pk"]}
              name={i["name"]}
              transaction_list={transaction_list}
              seller={0}
            />{" "}
            <IdCard seller_id={i["pk"]} name={i["name"]} type={"buyer"} />
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
              is_seller={0}
            />
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      {Buyer === undefined || Buyer.length === 0 ? (
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
                {/* <Checkbox>View All Issues</Checkbox> */}
              </Col>
            </Row>
          </div>
          <Table
            columns={buyerColumns}
            dataSource={isFiltering ? filteredData : Buyer}
            pagination={{ position: ["bottomLeft"], pageSize: 8 }}
            scroll={{ x: 1350 }}
          />
        </>
      )}
    </>
  );
}
export default App;
