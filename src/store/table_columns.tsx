import { Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { capitalize } from "../dashboard-ui/components/users";
import { IBuyerTransaction, ISellerTransaction } from "./app_interfaces";


export const CSellerColumns: ColumnsType<ISellerTransaction> = [
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
    render: (con, i: any) => {
      return (
        <>
          {i["gsi_status"] === undefined && <>---</>}
          {i["gsi_status"] && (
            <p className={i["gsi_status"]}>{capitalize(i["gsi_status"])}</p>
          )}
          {i["event_latest"] === undefined && <>---</>}
          {i["event_latest"] && <>{i["event_latest"]}</>}
        </>
      );
    },
  },
  {
    title: "Produce",
    dataIndex: "produce",
    key: "produce",
  },
  {
    title: "Transaction Value",
    dataIndex: "seller_final_price",
    key: "seller_final_price",

    render: (seller_final_price: string) => <>₹{seller_final_price}</>,
  },
  {
    title: "Quantity",
    dataIndex: "matched_quantity",
    key: "matched_quantity",
    render: (matched_quantity: string) => <>{matched_quantity}qtl</>,
  },

  {
    title: "Seller ID",
    dataIndex: "gsi",
    key: "gsi",
    render: (SellerID: string) => <>{SellerID}</>,
  },
  {
    title: "Buyer",
    dataIndex: ["buyer_id", "buyer_location"],
    key: "buyer_id",
    render: (_buyer, i) => (
      <>
        <>{i["buyer_id"]}</>
        <br></br>
        <>{i["buyer_location"]}</>
      </>
    ),
  },
];

export const CBuyerColumns: ColumnsType<IBuyerTransaction> = [
  {
    title: "ID",
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
          {i["gsi_status"] === undefined && <>---</>}
          {i["gsi_status"] && (
            <p className={i["gsi_status"]}>{capitalize(i["gsi_status"])}</p>
          )}
          {i["event_latest"] === undefined && <>---</>}
          {i["event_latest"] && <>{i["event_latest"]}</>}
        </>
      );
    },
  },

  {
    title: "Produce",
    dataIndex: "produce",
    key: "produce",
  },
  {
    title: "Transaction Value",
    dataIndex: "buyer_final_price",
    key: "buyer_final_price",

    render: (buyer_final_price: string) => <>₹{buyer_final_price}</>,
  },
  {
    title: "Quantity",
    dataIndex: "matched_quantity",
    key: "matched_quantity",
    render: (matched_quantity: string) => <>{matched_quantity}qtl</>,
  },
  {
    title: "Buyer ID",
    dataIndex: "gsi",
    key: "gsi",
  },
  {
    title: "Seller",
    dataIndex: ["seller_id", "seller_location"],
    key: "seller_id",
    render: (_seller, i) => (
      <>
        <>{i["seller_id"]}</>
        <br></br>
        <>{i["seller_location"]}</>
      </>
    ),
  },
];
