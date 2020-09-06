import React from "react";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import moment from "moment";
import { CheckIsEmpty } from "../../../library/FuncCheckEmpty";
import CsvDownloader from 'react-csv-downloader';

const PageHeading = React.memo(({ name, resultDataUser }) => {
  const { data } = resultDataUser;

  const renderHtml = () => {
    switch (name) {
      case "Dashboard Users":
        const headers = [
          { label: "User id", key: "userid"},
          { label: "User Name", key: "username" },
          { label: "Register Date", key: "regdate" },
          { label: "Last login", key: "lastlogin" },
        ];

        const dataUser = [];

        if (CheckIsEmpty(data) && data) {
          data.map((v, k) => {
            dataUser[k] = {
              userid: v.user_id,
              username: v.user_name,
              regdate: moment(v.user_regdate).format("LLLL"),
              lastlogin: moment(v.user_last_login).format("LLLL"),
            };
          });
        }
       
        const fileNameCsv = name.toLowerCase()
        
        const resultFileName = fileNameCsv.split(" ").join("-")
     
        return (
          <React.Fragment>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">{name}</h1>
              <div className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                <i className="fas fa-download fa-sm text-white-50"></i>
                <CSVLink
                  className="text-light p-2 remove_underline w-100"
                  filename={`${resultFileName}.csv`}
                  data={dataUser}
                  headers={headers}
                >
                  Download CSV
                </CSVLink>
                 
              </div>
            </div>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">{name}</h1>
              <div className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"></div>
            </div>
          </React.Fragment>
        );
    }
  };
  return <React.Fragment>{renderHtml()}</React.Fragment>;
});

PageHeading.defaultProps = {
  name: "Dashboard",
  resultDataUser: "",
};

const mapStateToProps = (state) => {
  return {
    resultDataUser: state.dashboardGetUsersReducers.dataUsers,
  };
};

export default connect(mapStateToProps)(PageHeading);
