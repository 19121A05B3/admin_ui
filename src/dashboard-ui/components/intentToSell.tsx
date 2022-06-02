import "antd/dist/antd.css";
import { Tabs, Table, Typography, Space, Tooltip, Row } from "antd";
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
  address1: any;
}
interface Buyer {
  pk: string;
  name: any;
  buyer_type: any;
  phone_no: any;
  address1: any;
}


function App() {
  const user_destiny_data: any = useSelector(
    (state: RootState) => state.main.vbUserData.user_destiny_data
  );
  const { sellyes, sellno } = useSelector(
    (state: RootState) => state.main.produceData
  );
  const { foDetails } = useSelector((state: RootState) => state.main);
  const columns = [
    {
      title: "ID",
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
      title: "Category",
      dataIndex: "category_name",
    },
    {
      title: "Produce",
      dataIndex: "crop_name",
    },
    {
      title: "Variety",
      dataIndex: "sub_category",
    },
    {
      title: "Grade",
      dataIndex: "grade",
    },
    {
      title: "Seller ID",
      dataIndex: "pk",
      render: (pk: any) => (
        <>
          {user_destiny_data[pk] != "" ? <>{user_destiny_data[pk]}</> : <>---</>}
          <br></br>
        </>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price Per Quintal",
      dataIndex: "price_per_qnt",
    },
  ];

  var yes: any = [];
  for (var i = 0; i < 5; i++) {
    if (sellyes && sellyes[i]) yes.push(sellyes[i]);
  }

  var no: any = [];
  for (i = 0; i < 5; i++) {
    if (sellno[i]) no.push(sellno[i]);
  }
  const viewAllButton = (
    <Row justify="end" wrap={false}>
      <Link to="/produces">View all Produces</Link>
    </Row>
  );
  return (
    <div className="t card-container">
      <Typography.Title level={4} className="title">
        Intent to Sell
      </Typography.Title>
      <Space> </Space>
      <Tabs type="card" className="card">
        {foDetails.assigned_user_type !== "buyer" && (
          <TabPane tab="Intent to sell : Yes" key="1">
            { sellyes != undefined ? (
              <>
                <Table<Seller>
                  columns={columns}
                  dataSource={yes}
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
        {foDetails.assigned_user_type !== "buyer" && (
          <TabPane tab="Intent to sell : No" key="2">
            {sellno != undefined ? (
              <>
                <Table<Buyer>
                  columns={columns}
                  dataSource={no}
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
