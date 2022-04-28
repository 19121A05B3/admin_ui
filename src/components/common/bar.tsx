import { MailOutlined,PhoneFilled } from '@ant-design/icons';

function Bar(props:any) {
    return (
        <div>
            <div className="left-text">
        <div className="left-text-first">
        <MailOutlined />  
        </div>
        <div className="left-text-second">
         {props.mail}
         </div>
         </div>
         <div className="right-text">
         <div className="left-text-first">
         <PhoneFilled/>
         </div>
         <div className="left-text-second">
         {props.phone}
        </div>
         </div>
        
        </div>
      );
  }

export default Bar;