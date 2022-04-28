import { Tabs } from "antd";
import OngoingActions from "./ongoing_actions";
import CreateNewAction from "../createcompo/PopOverCompo";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const { TabPane } = Tabs;

const ActionsUI = () => {
  const { OnGoing: onGoingData, Completed } = useSelector(
    (state: RootState) => state.main.actionsTabData
  );

  return (
    <div className="action">
      <Tabs defaultActiveKey="1" type="card" className="atwidth">
        <TabPane tab="On Going Actions" key="1">
          <p className="createnewaction">
            {/* <CreateNewAction /> */}
            <CreateNewAction />
          </p>
          <OngoingActions data={onGoingData} name="ongoing" />
        </TabPane>
        <TabPane tab="Completed Actions" key="2">
          <OngoingActions data={Completed} name="completed" />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ActionsUI;
