import { Table, Row, Col, Select, Input, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IItsy } from "../../store/app_interfaces";
import Photos from "./Modal";
import { RangeSelector } from "../../components/common/range_selector";
import { loadingIndicator } from "./transactions";
import { getKeyByValue } from "./usersmenu";

const { Option } = Select;

const PK_FILTER = "pk";
const CATEGORY_NAME_FILTER = "category_name";
const CROP_NAME_FILTER = "crop_name";
const SUB_CATEGORY_FILTER = "sub_category";
const GRADE_FILTER = "grade";
const SK_FILTER = "sk";
interface propType {
  sellData: never[];
}

const ProduceTab = (props: propType) => {
  let {
    produce,
    grade,
    category,
    variety,
    // apmc_price,
    price_per_qnt,
    seller_qty,
  } = useSelector((state: RootState) => state.main.produceData);
  console.log(props.sellData);
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );

  // if (props.allproduces == 1) {
  //   console.log(sellyes);
  //   console.log(sellno);
  //   sellyes = sellyes.concat(sellno);
  //   console.log(sellyes);
  // }

  // const [selectorValues, setSelectorValues] = useState({
  //     category_name: [""],
  //     crop_name: [""],
  //     sub_category: [""],
  //     grade: [""]
  // });

  const [allFilters, setAllFilters] = useState({
    sk: "",
    category_name: "",
    crop_name: "",
    sub_category: "",
    grade: "",
    pk: "",
    quantity: [0, 9999900000],
    created_timestamp: "",
    price_per_qnt: [0, 9999900000],
    estimatedvalue: [0, 9999900000],
    apmc_rate_data: [0, 9999900000],
  });

  const [filteredData, setFilteredData] = useState([{}]);
  const [isFiltering, setIsFiltering] = useState(false);

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

    let allData: Array<IItsy> = props.sellData;

    allData.forEach((item: IItsy) => {
      if (isNestedFilter) {
        if (
          item.sk &&
          item.sk.includes(allFilters.sk) &&
          item.category_name &&
          item.category_name.includes(allFilters.category_name) &&
          item.crop_name &&
          item.crop_name.includes(allFilters.crop_name) &&
          item.sub_category &&
          item.sub_category.includes(allFilters.sub_category) &&
          item.grade &&
          item.grade.includes(allFilters.grade) &&
          item.pk &&
          item.pk.includes(allFilters.pk) &&
          item.quantity &&
          parseInt(item.quantity) >= allFilters.quantity[0] &&
          item.quantity &&
          parseInt(item.quantity) <= allFilters.quantity[1] &&
          item.price_per_qnt &&
          parseInt(item.price_per_qnt) >= allFilters.price_per_qnt[0] &&
          item.price_per_qnt &&
          parseInt(item.price_per_qnt) <= allFilters.price_per_qnt[1]
          //  &&
          // item.apmc_rate_data &&
          // item.apmc_rate_data.apmc_price &&
          // item.apmc_rate_data.apmc_price >= allFilters.apmc_rate_data[0] &&
          // item.apmc_rate_data.apmc_price <= allFilters.apmc_rate_data[1]
          // item.apmc_rate_data != undefined
          //   ? item.apmc_rate_data.apmc_price >= allFilters.apmc_rate_data[0] &&
          //     item.apmc_rate_data.apmc_price <= allFilters.apmc_rate_data[1]
          //   : console.log("")
        )
          finalFilteredData.push(item);
      } else {
        if (
          (item.sk && item.sk.includes(noEmptyVal(allFilters.sk))) ||
          (item.category_name &&
            item.category_name.includes(
              noEmptyVal(allFilters.category_name)
            )) ||
          (item.crop_name &&
            item.crop_name.includes(noEmptyVal(allFilters.crop_name))) ||
          (item.sub_category &&
            item.sub_category.includes(noEmptyVal(allFilters.sub_category))) ||
          (item.grade && item.grade.includes(noEmptyVal(allFilters.grade))) ||
          (item.pk && item.pk.includes(noEmptyVal(allFilters.pk))) ||
          (item.quantity &&
            parseInt(item.quantity) >= allFilters.quantity[0] &&
            item.quantity &&
            parseInt(item.quantity) <= allFilters.quantity[1]) ||
          (item.price_per_qnt &&
            parseInt(item.price_per_qnt) >= allFilters.price_per_qnt[0] &&
            item.price_per_qnt &&
            parseInt(item.price_per_qnt) <= allFilters.price_per_qnt[1])
          //   ||
          // (item.apmc_rate_data &&
          //   item.apmc_rate_data.apmc_price &&
          //   item.apmc_rate_data.apmc_price >= allFilters.apmc_rate_data[0] &&
          //   item.apmc_rate_data.apmc_price <= allFilters.apmc_rate_data[1])
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
      const f = { ...prevState, quantity: range };
      return f;
    });
  };
  const priceperqtlSelector = (range: any) => {
    if (!range) return;
    setAllFilters((prevState) => {
      const f = { ...prevState, price_per_qnt: range };
      return f;
    });
  };
  // const estimatedvalueSelector = (range: any) => {
  //   if (!range) return;
  //   setAllFilters((prevState) => {
  //     const f = { ...prevState, estimatedvalue: range };
  //     return f;
  //   });
  // };
  // const apmcratedataSelector = (range: any) => {
  //   dp(range);
  //   if (!range) return;
  //   setAllFilters((prevState) => {
  //     const f = { ...prevState, apmc_rate_data: range };
  //     return f;
  //   });
  // };
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
              {category.seller.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      dataIndex: "category_name",
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
              {produce.seller.map((val) => (
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
              {variety.seller.map((val) => (
                <Option value={val}>{val}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      ),
      dataIndex: "sub_category",
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
              {grade.seller.map((val) => (
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
          <Col span={24}>Seller ID</Col>
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
          name="Quantity"
          min={seller_qty?.min ?? 0}
          max={seller_qty?.max ?? 90000}
          onSubmit={quantitySelector}
        />
      ),
      dataIndex: "quantity",
    },
    {
      title: (
        <RangeSelector
          name="Price Per Quintal"
          min={price_per_qnt?.min ?? 0}
          max={price_per_qnt?.max ?? 90000}
          onSubmit={priceperqtlSelector}
        />
      ),
      dataIndex: "price_per_qnt",
    },
    // {
    //   title: "Estimated Value",
    //   dataIndex: "estimatedvalue",
    //   render: (details: any) => {
    //     return (
    //       <>
    //         {details == undefined && <>---</>}
    //         {details && <>{details}</>}
    //       </>
    //     );
    //   },
    // },
    // {
    //   //   title: (
    //   //     <RangeSelector
    //   //       name="Apmc Rate"
    //   //       min={apmc_price?.min ?? 0}
    //   //       max={apmc_price?.max ?? 90000}
    //   //       onSubmit={apmcratedataSelector}
    //   //     />
    //   //   ),
    //   title: "Apmc Rate",
    //   dataIndex: "apmc_rate_data",
    //   render: (details: any) => {
    //     return (
    //       <>
    //         {details == undefined && details?.apmc_price == undefined && (
    //           <>---</>
    //         )}
    //         {details && details?.apmc_price && <>{details.apmc_price}</>}
    //       </>
    //     );
    //   },
    // },
    {
      title: "Days Since Added",
      dataIndex: "created_timestamp",
      render: (val: string) => {
        return <>{val ? val.slice(0, val.indexOf("T")) : "---"}</>;
      },
    },
    {
      title: "More",
      dataIndex: "crop_image_1",
      width: "100px",
      render: (val: string) => {
        return (
          <>
            <Photos val={val} />
            <br></br>
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
      {props.sellData === undefined ? (
        loadingIndicator
      ) : (
        <Table
          columns={columns}
          dataSource={isFiltering ? filteredData : props.sellData}
          pagination={{ position: ["bottomLeft"], pageSize: 8 }}
          scroll={{ x: 1350 }}
        />
      )}
    </div>
  );
};
export default ProduceTab;
