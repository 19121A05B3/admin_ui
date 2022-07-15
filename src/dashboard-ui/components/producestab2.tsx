import { Table, Row, Col, Select, Input, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IItsy } from "../../store/app_interfaces";
import { RangeSelector } from "../../components/common/range_selector";
import { getKeyByValue } from "./usersmenu";
const { Option } = Select;

const PK_FILTER = "pk";
const CATEGORY_NAME_FILTER = "crop_name";
const CROP_NAME_FILTER = "category";
const SUB_CATEGORY_FILTER = "sub_type";
const GRADE_FILTER = "grade";
const SK_FILTER = "sk";

interface propsType {
  buyer_data: never[];
}

const ProduceTab2 = (props: propsType) => {
  const { buyer_data } = props;
  const { produce, grade, category, variety, buyer_qty } = useSelector(
    (state: RootState) => state.main.produceData
  );
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  // const [selectorValues, setSelectorValues] = useState({
  //     category: [""],
  //     crop_name: [""],
  //     sub_type: [""],
  //     grade: [""]
  // });

  const [allFilters, setAllFilters] = useState({
    sk: "",
    category: "",
    crop_name: "",
    sub_type: "",
    grade: "",
    pk: "",
    quantity: [0, 9999900000],
    created_timestamp: "",
    price_per_qnt: "",
    estimatedvalue: "",
    apmc_rate_data: "",
  });

  const [filteredData, setFilteredData] = useState([{}]);
  const [isFiltering, setIsFiltering] = useState(false);
  const quantitySelector = (range: any) => {
    if (!range) return;
    setAllFilters((prevState) => {
      const f = { ...prevState, quantity: range };
      return f;
    });
  };

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

    let finalFilteredData: Array<IItsy> = [];

    const noEmptyVal = (v: string) => {
      if (!Boolean(v)) return "`";
      return v;
    };

    let allData: Array<IItsy> = buyer_data;
    allData.forEach((item: IItsy) => {
      if (isNestedFilter) {
        if (
          item.sk &&
          item.sk.includes(allFilters.sk) &&
          item.category &&
          item.category.includes(allFilters.category) &&
          item.crop_name &&
          item.crop_name.includes(allFilters.crop_name) &&
          item.sub_type &&
          item.sub_type.includes(allFilters.sub_type) &&
          item.grade &&
          item.grade.includes(allFilters.grade) &&
          item.pk &&
          item.pk.includes(allFilters.pk) &&
          parseInt(item.quantity) >= allFilters.quantity[0] &&
          parseInt(item.quantity) <= allFilters.quantity[1]
        )
          finalFilteredData.push(item);
      } else {
        if (
          item.sk.includes(noEmptyVal(allFilters.sk)) ||
          (item.category &&
            item.category.includes(noEmptyVal(allFilters.category))) ||
          (item.crop_name &&
            item.crop_name.includes(noEmptyVal(allFilters.crop_name))) ||
          (item.sub_type &&
            item.sub_type.includes(noEmptyVal(allFilters.sub_type))) ||
          (item.grade && item.grade.includes(noEmptyVal(allFilters.grade))) ||
          item.pk.includes(noEmptyVal(allFilters.pk)) ||
          (parseInt(item.quantity) >= allFilters.quantity[0] &&
            parseInt(item.quantity) <= allFilters.quantity[1])
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
              onChange={(val) => updateAllFilters(SK_FILTER, val.target.value)}
            />
          </Col>
        </Row>
      ),
      dataIndex: "sk",
      render: (val: string) => {
        return (
          <>
            <Tooltip title={val}>
              <span style={{ marginLeft: "10px" }}>
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
              onChange={(val) =>
                updateAllFilters(CATEGORY_NAME_FILTER, `${val}`)
              }
            >
              {category.buyer.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      dataIndex: "crop_name",
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
              onChange={(val) => updateAllFilters(CROP_NAME_FILTER, `${val}`)}
            >
              {produce.buyer.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      dataIndex: "category",
    },
    {
      title: (
        <Row>
          <Col span={24}>Variety</Col>
          <Col span={24}>
            <Select
              className="filters"
              placeholder="Select"
              allowClear
              onChange={(val) =>
                updateAllFilters(SUB_CATEGORY_FILTER, `${val}`)
              }
            >
              {variety.buyer.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      dataIndex: "sub_type",
    },
    {
      title: (
        <Row>
          <Col span={24}>Grade</Col>
          <Col span={24}>
            <Select
              className="filters"
              placeholder="Select"
              allowClear
              onChange={(val) => updateAllFilters(GRADE_FILTER, `${val}`)}
            >
              {grade.buyer.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      dataIndex: "grade",
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
              onChange={(val) => updateAllFilters(PK_FILTER, val.target.value)}
            />
          </Col>
        </Row>
      ),
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
        <RangeSelector
          name="Quantity Required"
          min={buyer_qty?.min ?? 0}
          max={buyer_qty?.max ?? 90000}
          onSubmit={quantitySelector}
        />
      ),
      dataIndex: "quantity",
    },
    // {
    //   title: "Tentative Delivery",
    //   dataIndex: "delivery_by",
    //   render: (val: string) => {
    //     return <>{val ? val.slice(0, val.indexOf("T")) : "---"}</>;
    //   },
    // },
    // {
    //   title: "Days Since Added",
    //   dataIndex: "created_timestamp",
    //   render: (val: string) => {
    //     return <>{val ? val.slice(0, val.indexOf("T")) : "---"}</>;
    //   },
    // },
    {
      title: "More",
      dataIndex: "more",
      render: (more: string) => {
        return (
          <>
            <a href="https://vikasbandhu.in/terms&conditions" target="_blank">
              Terms and Conditions
            </a>
          </>
        );
      },
    },
  ];
  return (
    <div className="ongoing-actions">
      <Table
        columns={columns}
        dataSource={isFiltering ? filteredData : buyer_data}
        pagination={{ position: ["bottomLeft"], pageSize: 8 }}
        scroll={{ x: 1350 }}
      />
    </div>
  );
};
export default ProduceTab2;
