import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

const Logs = props => {
  let showLogs = () => {
    if (props.nav.promptLogs == null) return;
    let arr = [];
    for (let log of props.nav.promptLogs) {
      arr.push(
        <div className="w-full inline-flex p-2 mt-1 bg-white">
          <div className="w-1/5 pl-10">
            <p>{moment(log.createdAt).format("YYYY/MM/DD hh:mm:ss")}</p>
          </div>
          <div className="w-1/5">
            <p>{log.who}</p>
          </div>
          <div className="w-3/5">
            <p>{log.task}</p>
          </div>
        </div>
      );
    }

    return arr;
  };

  return (
    <div
      style={{
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        overflow: "hidden",
        background: "whitesmoke",
        boxShadow: "0px 0px 10px #cecece"
      }}
      className="w-newScreen h-newScreen bg-white z-60 mt-16 align-absolute"
    >
      <div className="w-full inline-flex flex items-center bg-blue-new relative">
        <div
          onClick={() => {
            props.toggleShowLog();
            props.clearItem();
          }}
          className="w-1/3 h-10 inline-flex"
        >
          <h4 className="p-2 text-white uppercase text-lg bg-red flex items-center hover:bg-semi-transparent cursor-pointer">
            <FontAwesomeIcon icon={faAngleLeft} className="fa-2x mr-4" />
            Back
          </h4>
        </div>
        <div className="bg-blue-new w-1/3 text-white p-2 text-center">
          <h3>Logs</h3>
        </div>
      </div>

      <div className="inline-flex w-full p-1 bg-grey-darker uppercase text-white text-sm absolute mt-10 pin-t pin-l">
        <div className="w-1/5 pl-16 uppercase">Date:</div>
        <div className="w-1/5 pl-3 uppercase">User:</div>
        <div className="w-3/5 ml-4 uppercase">Actions:</div>
      </div>
      <div className="mt-6" />

      <div className="w-full overflow-y-auto h-650">{showLogs()}</div>
    </div>
  );
};

export default Logs;
