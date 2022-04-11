import React from 'react';
import 'antd/dist/antd.css';
// import './Produce copy.scss';

export default function Produce(props:any) {
    return (
        <div className="produce-container">
            <table>
                <tr ><td width={95} ><img style={{width:87, height:87}} alt={props.produce} src={props.img} /></td>
                <td> <table>
                    <tr><td>{props.produce}</td></tr>
                    <tr><td>{props.verity}</td></tr>
                    <tr><td>{props.category}</td></tr>
                </table></td></tr>
            </table>

        </div>
    )
}





