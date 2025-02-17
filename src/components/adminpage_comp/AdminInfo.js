import React from "react";
import axios from "axios";

export default class AdminInfo extends React.Component {
  state = {
    variable: 1,
    error: "",
  };

  handleinfo = () => {
    this.setState(() => ({ variable: 1 }));
  };
  handlepassword = () => {
    this.setState(() => ({ variable: 2 }));
  };

  handleresult = () => {
    this.setState(() => ({ variable: 3 }));
  };

  handleDownload = async (hostelName) => {
    try {
      const url = `https://hostel-allotment-api.herokuapp.com/admin/result?hostelName=${hostelName}`;
      const userData = JSON.parse(localStorage.getItem("userData"));
      const config = {
        responseType: "blob",
        headers: {
          Authorization: userData.token,
          Accept: "application/pdf",
        },
      };
      const response = await axios.get(url, config);
      const u = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = u;
      link.setAttribute("download", "file.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
      this.setState(() => ({ error: "" }));
    } catch (e) {
      this.setState(() => ({ error: "!!! Please refresh the page" }));
    }
  };
  downloadList = (inbox) => {
    return inbox.map((hostelName, index) => (
      <div className="pdfflex">
        <div>
          {" "}
          <p className="pdflist" key={index}>
            Download result of {hostelName}
          </p>
        </div>
        <div>
          {" "}
          <button onClick={(e) => this.handleDownload(hostelName)}>
            download
          </button>
        </div>
      </div>
    ));
  };
  render() {
    return (
      <div>
        <h1 className="heading111">Admin Info </h1>
        <div className="userinfoflex">
          <div>
            <button
              className={
                this.state.variable === 1 ? "userinfoflex3" : "userinfoflex2"
              }
              onClick={this.handleinfo}
            >
              Your Info
            </button>
            {/*
            <button
              className={
                this.state.variable === 2 ? "userinfoflex3" : "userinfoflex2"
              }
              onClick={this.handlepassword}
            >
              Change Password
            </button>
            */}
            <button
              className={
                this.state.variable === 3 ? "userinfoflex3" : "userinfoflex2"
              }
              onClick={this.handleresult}
            >
              Download Results
            </button>
          </div>
          <div className="overflowcontrol">
            <div className="bring-middle">
              {this.state.variable === 1 ? yourinfo(this.props.User.name) : ""}
              {/*this.state.variable === 2 ? <ChangeAdminpassword /> : ""*/}
              {this.state.variable === 3 && (
                <div>
                  {this.state.error && (
                    <p className="error">{this.state.error}</p>
                  )}
                  <h3>Download PDF file of Declared Results...</h3>

                  {this.props.User.inbox.length === 0 ? (
                    <p>Currently no results declared.</p>
                  ) : (
                    <div>{this.downloadList(this.props.User.inbox)}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const yourinfo = (name) => {
  return (
    <div className="spacing">
      <h4>Welcome back {name}</h4>

      <p>Your room allotment is under process.</p>
    </div>
  );
};
