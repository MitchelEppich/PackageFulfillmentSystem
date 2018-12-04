qaimport React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faTimes } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

const Users = props => {
    
  let showUsers = () => {
    if (props.user.registeredUsers == null) return;
    let arr = [];
    for (let user of props.user.registeredUsers) {
      arr.push(
        <div className="w-full inline-flex p-2 mt-1 bg-white flex items-center">
          <div className="w-24 pl-8 uppercase">{arr.length+1}</div>{console.log("here",)}
          <div className="w-2/8 pl-3 capitalize">{user.username}</div>
          <div className="w-1/8 pl-3 capitalize">{user.badge}</div>
            <div className="w-1/8 pl-4 capitalize">{user.online ? "Online" : "Offline"}</div>
            <div className="w-2/8 pl-4 capitalize">{user.lastAction || "No actions on record . . ."}</div>
          <div className="w-1/8 pl-4 capitalize flex items-center">                      
            {user.locked ? "Locked" : "Unlocked"}
        </div>
          <div className="w-1/8 pl-4 capitalize text-center">
            <div className="w-10 h-10 p-2 text-center justify-center mx-auto align-center cursor-pointer hover:bg-grey-light hover:text-black">
                <FontAwesomeIcon icon={faTimes} className="fa-lg text-red text-center" />
            </div>
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
          <h3>Manage Users</h3>
        </div>
      </div>
      <div className="inline-flex w-full p-1 bg-grey-darker uppercase text-white text-sm absolute mt-10 pin-t pin-l">
        <div className="w-24 pl-4 uppercase">Number</div>
        <div className="w-2/8 pl-3 uppercase">Username</div>
        <div className="w-1/8 pl-5 uppercase">Badge</div>
        <div className="w-1/8 pl-4 uppercase">Status</div>
        <div className="w-2/8 pl-4 uppercase">Last Actions</div>
        <div className="w-1/8 pl-6 uppercase">Lock User</div>
        <div className="w-1/8 pl-12 uppercase">Delete User</div>
      </div>

      <div className="mt-6" />
      <div className="w-full overflow-y-auto h-650">{showUsers()}</div>
    </div>
  );
};

export default Users;
