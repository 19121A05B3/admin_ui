import React from "react";
import axios from "axios";
import { useState } from "react";
import "../App.css";
import S3FileUpload from "react-s3";
function Home() {
  const [Greet, setGreet] = useState("");
  const [Get, setGet] = useState("");
  const [name, setname] = useState("");
  const [data, setdata] = useState("");
  const handleclickget = () => {
    axios
      .get(`/vbusers`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleclickpost = () => {
    var name = { admin: document.getElementById("name").value };
    console.log(name);
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(`/vbusers`, name, headers)
      .then((res) => {
        console.log(res);
        // console.log(res.data.name);
        // setGreet(res.data.name);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  const file = (e) => {
    // var datas=e.target.files[0];
    // console.log(datas['name']);
    // console.log(datas);
    // // datas['name']='data.pdf';
    // var formData = new FormData();
    // var newFileName='Data.pdf';
    // formData.append('file', data, newFileName);
    setdata(e.target.files[0]);
    console.log(data);
  };
  var upload = () => {
    const date = String(new Date().toISOString());
    const admin = "9000489472";
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      dirName: `${admin}/${date}` /* optional */,
      region: "ap-south-1",
      accessKeyId: process.env.REACT_APP_accessKeyId,
      secretAccessKey: process.env.REACT_APP_secretAccessKey,
    };
    
    console.log(config);

    S3FileUpload.uploadFile(data, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
    // setdata('');
  };
  return (
    <div>
      <input
        id="name"
        type="text"
        value={name}
        onInput={(e) => {
          setname(e.target.value);
          console.log(name);
        }}
        placeholder="Name"
      />
      <br />
      <br />
      <button type="submit" onClick={handleclickpost}>
        Post
      </button>
      <button type="submit" onClick={handleclickget}>
        Get
      </button>
      <br />
      <br />
      <label>Post Data</label>
      <input value={Greet} type="text" readOnly></input>
      <br />
      <label>Get Data</label>
      <input value={Get} type="text" readOnly></input>
      <br />
      <br />
      <br />
      <button>
        <label htmlFor="file">Attach File</label>
      </button>
      <input type="file" id="file" onChange={file}></input>
      <br></br>
      <input type="button" value="submit" onClick={upload} />
    </div>
  );
}

export default Home;
