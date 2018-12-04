import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

const Users = props => {
  let showUsers = () => {
    if (props.user.registeredUsers == null) return;
    let arr = [];
    for (let user of props.user.registeredUsers) {
      arr.push(
        <div className="w-full inline-flex p-2 mt-1 bg-white">
          <div className="w-1/5 pl-16 uppercase">{arr.length}</div>
          <div className="w-1/5 pl-3 uppercase">{user.username}</div>
          <div className="w-1/5 pl-3 uppercase">{user.badge}</div>
          <div className="w-1/5 ml-4 uppercase">
            {user.online ? "Online" : "Offline"}
          </div>
          <div className="w-1/5 ml-4 uppercase">
            {user.lastAction || "No actions on record . . ."}
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
            props.setVisibleScreen(null);
          }}
          className="w-1/3 h-10 inline-flex"
        >
          <h4 className="p-2 text-white uppercase text-lg bg-red flex items-center hover:bg-semi-transparent cursor-pointer">
            <FontAwesomeIcon icon={faAngleLeft} className="fa-2x mr-4" />
            Back
          </h4>
        </div>
        <div className="bg-blue-new w-1/3 text-white p-2 text-center">
          <h3>Users</h3>
        </div>
      </div>
      <div className="inline-flex w-full p-1 bg-grey-darker uppercase text-white text-sm absolute mt-10 pin-t pin-l">
        <div className="w-1/5 pl-16 uppercase">Number</div>
        <div className="w-1/5 pl-3 uppercase">Username</div>
        <div className="w-1/5 pl-3 uppercase">Badge</div>
        <div className="w-1/5 ml-4 uppercase">Status</div>
        <div className="w-1/5 ml-4 uppercase">Actions</div>
      </div>

      <div className="mt-6" />
      <div className="w-full overflow-y-auto h-650">{showUsers()}</div>
    </div>
  );
};

export default Users;
