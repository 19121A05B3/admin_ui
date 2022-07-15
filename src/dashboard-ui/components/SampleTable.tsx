import "antd/dist/antd.css";
import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Produce from "./Produce copy";
import LiveRates from "./LiveRates";
import Photos from "./Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface propType {
  crop_image_1: string;
  crop_name: string;
  category_name: string;
  sub_category: string;
  grade: string;
  price_per_qnt: string;
  intent_to_sell: string;
  apmc_rate_data: any;
  quantity: string; //need to be mapped to quantity remaining later
}
interface params {
  produce_list: any;
  issues: any;
  is_seller: any;
}
export default function SampleTest(props: params) {
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  const columns: ColumnsType<propType> = [
    {
      title: "Produce",
      dataIndex: ["crop_name", "sub_category", "category_name"],
      width: 200,
      align: "left",
      render: (_produce, i) => (
        <Produce
          produce={i["crop_name"]}
          img={i["crop_image_1"]}
          verity={i["sub_category"]}
          category={i["category_name"]}
        />
      ),
    },
    {
      title: "Grade",
      width: 100,
      align: "center",
      dataIndex: "grade",
    },
    {
      title: "Quantity",
      width: 138,
      align: "left",
      dataIndex: "quantity",
      render: (quantity) => (
        <div>
          {" "}
          {quantity} qtl
          <table>
            <tr>
              <td>
                <div style={{ width: 100, height: 12 }}>
                  <progress
                    className="quan-rem-progress"
                    value={quantity}
                    max={quantity}
                  ></progress>
                </div>
              </td>
              <td>
                <span className="quanRem-total">{quantity} qtl</span>
              </td>
            </tr>
          </table>
        </div>
      ),
    },

    {
      title: "Price per qtl",
      width: 100,
      align: "center",
      dataIndex: "price_per_qnt",
    },
    {
      title: "Live APMC Rates per qtl",
      width: 160,
      dataIndex: "apmc_rate_data",
      align: "center",
      render: (apmc_rate_data?) => (
        <LiveRates
          rate={apmc_rate_data?.apmc_price}
          change={apmc_rate_data?.increase}
        />
      ),
    },

    {
      title: "Intent Sell",
      width: 85,
      align: "center",
      dataIndex: "intent_to_sell",
    },

    {
      title: "Addititonal",
      width: 100,
      align: "center",
      dataIndex: "crop_image_1",
      render: (crop_image_1) => (
        <>
          <a href="https://vikasbandhu.in/terms&conditions" target="_blank">
            Terms and Conditions
          </a>
          <br></br>
          <Photos val={crop_image_1} />
        </>
      ),
    },
  ];
  const Ibuyercolumns: ColumnsType<propType> = [
    {
      title: "Produce",
      dataIndex: ["crop_name", "sub_category", "category_name"],
      width: 200,
      align: "left",
      render: (_produce, i) => (
        <Produce
          produce={i["crop_name"]}
          img={i["crop_image_1"]}
          verity={i["sub_category"]}
          category={i["category_name"]}
        />
      ),
    },
    {
      title: "Grade",
      width: 100,
      align: "center",
      dataIndex: "grade",
    },
    {
      title: "Quantity",
      width: 138,
      align: "left",
      dataIndex: "quantity",
      render: (quantity) => (
        <div>
          {" "}
          {quantity} qtl
          <table>
            <tr>
              <td>
                <div style={{ width: 30, height: 12 }}>
                  <progress
                    className="quan-rem-progress"
                    value={quantity}
                    max={quantity}
                  ></progress>
                </div>
              </td>
              <td>
                <span className="quanRem-total">{quantity} qtl</span>
              </td>
            </tr>
          </table>
        </div>
      ),
    },

    // {
    //   title: "Price per qtl",
    //   width: 100,
    //   align: "center",
    //   dataIndex: "price_per_qnt",
    // },
    // {
    //   title: "Live APMC Rates per qtl",
    //   width: 160,
    //   dataIndex: "apmc_rate_data",
    //   align: "center",
    //   render: (apmc_rate_data?) => (
    //     <LiveRates rate={apmc_rate_data?.apmc_price} change={apmc_rate_data?.increase} />
    //   )

    // },

    // {
    //   title: "Intent Sell",
    //   width: 85,
    //   align: "center",
    //   dataIndex: "intent_to_sell"
    // },

    {
      title: "Addititonal",
      width: 100,
      align: "center",
      dataIndex: "crop_image_1",
      render: (crop_image_1) => (
        <>
          <a href="https://vikasbandhu.in/terms&conditions" target="_blank">
            Terms and Conditions
          </a>
          <br></br>
          {/* <Photos val={crop_image_1} /> */}
        </>
      ),
    },
  ];
  const issuesColumns = [
    {
      title: "Action ID ",
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
      title: "Category",
      dataIndex: "category_type",
      key: "category_type",
    },
    {
      title: "Request/Issue",
      dataIndex: "request",
      key: "request",
    },
    {
      title: "Seller/Buyer ID",
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
      title: "Details",
      key: "details",
      dataIndex: "details",
      render: (details: any) => {
        return (
          <>
            {details === undefined && <>No details Provided</>}
            {details && <>{details}</>}
          </>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
  ];
  return (
    <div className="st">
      {props.issues === 0 && props.is_seller === 1 && (
        <Table<propType>
          columns={columns}
          dataSource={props.produce_list}
          pagination={{ pageSize: 4 }}
          scroll={{ x: 940 }}
        />
      )}
      {props.issues === 0 && props.is_seller === 0 && (
        <Table<propType>
          columns={Ibuyercolumns}
          dataSource={props.produce_list}
          pagination={{ pageSize: 4 }}
          scroll={{ x: 940 }}
        />
      )}

      {props.issues === 1 && (
        <Table<propType>
          columns={issuesColumns}
          dataSource={props.produce_list}
          pagination={{ pageSize: 4 }}
          scroll={{ x: 940 }}
        />
      )}
    </div>
  );
}
