import "antd/dist/antd.css";
import { Tabs, Table, Typography, Space, Row } from "antd";
import { ColumnsType } from "antd/es/table";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import { loadingIndicator } from "./transactions";

const { TabPane } = Tabs;
interface Seller {
  pk: string;
  name: any;
  seller_type: any;
  phone_no: any;
  email: any;
  address1: any;
}
interface Buyer {
  pk: string;
  name: any;
  buyer_type: any;
  phone_no: any;
  address1: any;
}
export const capitalize = (str: any) => {
  try {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  } catch (err) {
    return "";
  }
};

function App() {
  const { Seller, Buyer } = useSelector(
    (state: RootState) => state.main.vbUserData
  );
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  const { foDetails } = useSelector((state: RootState) => state.main);
  const viewAllButton = (
    <Row justify="end" wrap={false}>
      <Link to="/users">View all Users</Link>
    </Row>
  );
  const columns: ColumnsType<Seller> = [
    {
      title: "ID",
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Type",
      dataIndex: "seller_type",
      render: (st: any) => capitalize(st),
    },
    {
      title: "Contact",
      dataIndex: ["phone_no", "email"],
      render: (con, i: any) => {
        return (
          <>
            {i["phone_no"] === undefined && <>---</>}
            {i["phone_no"] && <>{i["phone_no"]}</>}
            <br></br>
            {i["email"] === undefined && <>---</>}
            {i["email"] && <>{i["email"]}</>}
            <br></br>
          </>
        );
      },
    },
    {
      title: "Address",
      dataIndex: ["address1", "address2"],
      render: (add, i: any) => (
        <>
          <>{i["address1"]}</>
          <br></br>
          <>{i["address2"]}</>
          <br></br>
        </>
      ),
    },
  ];
  const columns1: ColumnsType<Buyer> = [
    {
      title: "ID",
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Type",
      dataIndex: "buyer_type",
      render: (bt: any) => capitalize(bt),
    },
    {
      title: "Contact",
      dataIndex: ["phone_no", "email"],
      render: (con, i: any) => {
        return (
          <>
            {i["phone_no"] === undefined && <>---</>}
            {i["phone_no"] && <>{i["phone_no"]}</>}
            <br></br>
            {i["email"] === undefined && <>---</>}
            {i["email"] && <>{i["email"]}</>}
            <br></br>
          </>
        );
      },
    },
    {
      title: "Address",
      dataIndex: ["address1", "address2"],
      render: (add, i: any) => (
        <>
          <>{i["address1"]}</>
          <br></br>
          <>{i["address2"]}</>
        </>
      ),
    },
  ];
  return (
    <div className="t card-container">
      <Typography.Title level={4} className="title">
        Users
      </Typography.Title>
      <Space> </Space>
      <Tabs type="card" className="card">
        {foDetails.assigned_user_type !== "buyer" && (
          <TabPane tab="Seller" key="1">
            {Seller != undefined ? (
              <>
                <Table<Seller>
                  columns={columns}
                  dataSource={Seller.slice(0, 5)}
                  pagination={false}
                  scroll={{ x: 1350 }}
                  footer={() => {
                    return viewAllButton;
                  }}
                />
              </>
            ) : (
              loadingIndicator
            )}
          </TabPane>
        )}
        {foDetails.assigned_user_type !== "seller" && (
          <TabPane tab="Buyer" key="2">
            {Buyer != undefined ? (
              <>
                <Table<Buyer>
                  columns={columns1}
                  dataSource={Buyer.slice(0, 5)}
                  pagination={false}
                  scroll={{ x: 1350 }}
                  footer={() => {
                    return viewAllButton;
                  }}
                />
              </>
            ) : (
              loadingIndicator
            )}
          </TabPane>
        )}
      </Tabs>
    </div>
  );
}
export default App;
