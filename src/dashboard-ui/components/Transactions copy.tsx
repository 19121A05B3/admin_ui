import 'antd/dist/antd.css';
import { Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ISellerTransaction } from "../../store/app_interfaces";
import { capitalize } from './users';
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
    align:"center",
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
    render: (_buyer, i) => (
      <>
        <>{i["buyer_id"]}</><br></br>
        <>{i["buyer_location"]}</>
      </>
    ),
  },

];
interface tlist {
  transaction_list: any;
}
export default function Transactions(props: tlist) {
  return (

    <Table
      columns={columns}
      dataSource={props.transaction_list}
      pagination={{ pageSize: 4 }} scroll={{ x: 600 }}
      rowClassName={(record, index) => record.gsi_status ? "b" + record.gsi_status : ""} />
  );
}


