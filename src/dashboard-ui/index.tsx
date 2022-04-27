import Information from "./components/information";
import { Tabs } from "antd";
import ActionsUI from "./components/actions_ui";

import { Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { capitalize } from "./components/users";

const { Title } = Typography;
const { TabPane } = Tabs;
const Dashboard = () => {
  const { foDetails } = useSelector((state: RootState) => state.main);
  return (
    <div className="dashboard">
      <div className="dashboard-title">
        <div className="center">
          <Title
            level={4}
            className="title-text"
          >
            Admin Dashboard:
          </Title>
          <Title level={4} className="role">
            Field Operator
          </Title>
        </div>
        <div>
          <Title
            level={5}
            className="address"
          >
            {capitalize(foDetails.thaluka)}, {capitalize(foDetails.address)}
          </Title>
        </div>
      </div>

      <Tabs defaultActiveKey="1" type="card" className="dashboard-media">
        <TabPane tab="Information" key="1">
          <Information />
        </TabPane>
        <TabPane tab="Actions" key="2" className="custom">
          <ActionsUI />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard;
