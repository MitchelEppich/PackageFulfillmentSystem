import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const Logs = props => {
  let showLogs = () => {
    if (props.nav.promptLogs == null) return;
    let arr = [];
    for (let log of props.nav.promptLogs) {
      arr.push(
        <div className="inline-flex w-full flex items-center bg-grey-lighter h-10 p-2 mt-1" key={arr}>
          <div className="w-1/5 pl-10 p-2">
            <p>{moment(log.createdAt).format("DD/MM/YYYY - hh:mm:ss")}</p>
          </div>
          <div className="w-1/5 p-2">
            <p>{log.who}</p>
          </div>
          <div className="w-3/5 p-2">
            <p>{log.task}</p>
          </div>
        </div>
      );
    }

    return arr;
  };

  return (
    <div style={{
      position: "absolute",
      height: "820px",
       width: "99vw",
    }} >
      <div 
      style={{     
        zIndex: "99999",
        background: "white" 
        }} 
      className="w-full h-full absolute justify-end">
        <div
          style={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            overflow: "hidden",
            background: "white",
            // boxShadow: "0px 0px 10px #cecece"
          }}
          className="w-newScreen h-newScreen bg-white z-60 mt-16 align-absolute"
        >
          <div className="w-full inline-flex flex items-center bg-blue-new relative">
            <div
              onClick={() => {
                props.setVisibleScreen(null);
                props.clearItem();
              }}
              className="w-1/3 h-10 inline-flex"
            >
              <h4 className="p-2 text-white uppercase text-lg bg-red flex items-center hover:bg-semi-transparent cursor-pointer">
                <FontAwesomeIcon icon={faAngleLeft} className="fa-2x mr-4" />
                Back
              </h4>
            </div>
            <div className="bg-blue-new w-1/3 text-white p-2 text-center uppercase">
              <h3>Logs</h3>
            </div>
            <div className="bg-blue-new w-1/3 flex items-center text-white text-right uppercase inline-flex">            
              <div className="w-full text-right mr-2 justify-end inline-flex">
                <input 
                  type="text" 
                  placeholder="Search here.." 
                  className="w-200 mr-2 p-1" 
                  name= "search"
                  id= "search"              
                  onChange={e=>{
                    let searched = e.target.value
                    console.log(searched)
                  }}

                />
                <h3><FontAwesomeIcon icon={faSearch} className="fa-lg mr-4 mt-1 cursor-pointer" /></h3>
              </div>
              
            </div>
          </div>

          <div className="inline-flex w-full p-1 bg-grey-darker uppercase text-white text-sm absolute mt-10 pin-t pin-l">
            <div className="w-1/5 text-center uppercase">Date</div>
            <div className="w-1/5 pl-3 uppercase">User</div>
            <div className="w-3/5 ml-4 uppercase">Actions</div>
          </div>
          <div className="mt-6" />

          <div className="w-full overflow-y-auto h-650">{showLogs()}</div>
          <Subscription subscription={subscription.logUpdate}>
            {({ data }) => {
              if (data != null) {
                let _log = data.logUpdate;
                let _promptLogs = props.nav.promptLogs;
                if (!JSON.stringify(_promptLogs).includes(JSON.stringify(_log))) {
                  props.modifyLogs({
                    log: _log,
                    promptLogs: _promptLogs
                  });
                }
              }
              return <div />;
            }}
          </Subscription>
        </div>
      </div>
    </div>
  );
};

const subscription = {
  logUpdate: gql`
    subscription {
      logUpdate {
        who
        task
        createdAt
      }
    }
  `
};

export default Logs;
