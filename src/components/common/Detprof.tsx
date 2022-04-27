import { Avatar, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { capitalize } from "../../dashboard-ui/components/users";
import { RootState } from "../../store";
import { logout } from "../../store/slices/loginCheck";

function Detail(props: any) {
  const dispatch = useDispatch();

  const { foDetails } = useSelector((state: RootState) => state.main);

  return (
    <Row gutter={16} wrap={false}>
      <Col>
        <Row className="foname">{capitalize(foDetails["name "])}</Row>
        <Row className="foid">FO ID:{foDetails.phone_no}</Row>
      </Col>
      <Col>
        <a href="/#" onClick={() => dispatch(logout())}>
          <Avatar />
        </a>
      </Col>
    </Row>

    //     <div className="container">
    //   <div className="row-2-70">
    //   <div className="cname">Mahesha</div>
    //   <div className="cid">FO ID:192192</div>
    //   </div>
    //   <div className="row-2-30">
    //   <Avatar/>
    //   </div>

    //  </div>
  );
}

export default Detail;
