import "antd/dist/antd.css";
import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { ISellerTransaction } from "../../store/app_interfaces";
import { capitalize } from "./users";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface tlist {
  transaction_list: any;
  seller: number;
  matches: number;
}
export default function Transactions(props: tlist) {
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  console.log(props.seller);
  const columns: ColumnsType<ISellerTransaction> = [
    {
      title: "ID",
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
      title: "Status",
      dataIndex: ["gsi_status", "event_latest"],
      key: "gsi_status",
      className: props.matches !== 1 ? "" : "display-none",
      render: (_Status, i) => (
        <>
          <p className={i["gsi_status"]}>{capitalize(i["gsi_status"])}</p>
          <>{i["event_latest"]}</>
        </>
      ),
    },
    {
      title: "Produce",
      dataIndex: "produce",
    },
    {
      title: "Transaction Value",
      dataIndex: "seller_final_price",
      key: "seller_final_price",
      align: "center",
      render: (seller_final_price: string) => <>₹{seller_final_price}</>,
    },
    {
      title: "Quantity",
      dataIndex: "matched_quantity",
      key: "matched_quantity",
      render: (matched_quantity: string) => <>{matched_quantity}qtl</>,
    },
    {
      title: "Buyer",
      dataIndex: ["buyer_id", "buyer_location"],
      key: "buyer_id",
      className: props.seller !== 0 ? "" : "display-none",
      render: (_buyer, i) => (
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
    {
      title: "Seller",
      dataIndex: ["seller_id", "seller_location"],
      key: "seller_id",
      className: props.seller === 0 ? "" : "display-none",
      render: (_buyer, i) => (
        <>
          {user_destiny_data[i["seller_id"]] != "" ? (
            <>{user_destiny_data[i["seller_id"]]}</>
          ) : (
            <>---</>
          )}
          <br></br>
          <>{i["seller_location"]}</>
        </>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={props.transaction_list}
      pagination={{ pageSize: 4 }}
      scroll={{ x: 600 }}
      rowClassName={(record, index) =>
        record.gsi_status ? "b" + record.gsi_status : ""
      }
    />
  );
}
