import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faTimes,
  faLock,
  faUserAlt,
  faUnlockAlt,
  faUserAltSlash
} from "@fortawesome/free-solid-svg-icons";

import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const Users = props => {
  let showUsers = () => {
    if (props.nav.promptUsers == null) return;
    let arr = [];
    for (let user of props.nav.promptUsers) {
      arr.push(
        <div className="w-full inline-flex p-2 mt-1 bg-white flex items-center">
          <div className="w-24 pl-8 uppercase">{arr.length + 1}</div>
          <div className="w-1/8 pl-3">{user.username}</div>
          <div className="w-1/8 pl-3">{user.badge}</div>
          <div className="w-24 pl-4 capitalize">
            {user.online ? (
              <div
                style={{
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  padding: "5px",
                  marginLeft: "10px",
                  backgroundColor: "#34d400"
                }}
                className="h-8 p-2 bg-green"
              />
            ) : (
              <div
                style={{
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  padding: "5px",
                  marginLeft: "10px",
                  backgroundColor: "#ff0700"
                }}
                className="h-8 p-2 bg-red"
              />
            )}
          </div>
          <div className="w-3/8 pl-4 capitalize">
            {user.lastAction || "No actions on record . . ."}
          </div>
          <div className="w-1/8 pl-4 capitalize text-center">
            {user.locked ? (
              <div className="w-10 h-10 p-2 text-center text-grey justify-center mx-auto align-center cursor-pointer hover:bg-grey-light hover:text-black">
                <FontAwesomeIcon icon={faLock} className="fa-lg" />
              </div>
            ) : (
              <div className="w-10 h-10 p-2 text-center text-grey justify-center mx-auto align-center cursor-pointer hover:bg-grey-light hover:text-black">
                <FontAwesomeIcon icon={faUnlockAlt} className="fa-lg" />
              </div>
            )}
          </div>
          <div className="w-1/8 capitalize text-center">
            {user.admin ? (
              <div className="w-10 h-10 p-2 text-center text-grey justify-center mx-auto align-center cursor-pointer hover:bg-black hover:text-black">
                <FontAwesomeIcon icon={faUserAlt} className="fa-lg" />
              </div>
            ) : (
              <div className="w-10 h-10 p-2 text-center  text-grey justify-center mx-auto align-center cursor-pointer hover:bg-grey-light hover:text-black">
                <FontAwesomeIcon icon={faUserAltSlash} className="fa-lg" />
              </div>
            )}
          </div>

          <div className="w-1/8 capitalize text-center">
            <div className="w-10 h-10 p-2 text-center hover:text-black text-red justify-center mx-auto align-center cursor-pointer hover:bg-grey-light">
              <FontAwesomeIcon icon={faTimes} className="fa-lg text-center" />
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
        <div className="bg-blue-new w-1/3 text-white p-2 text-center uppercase">
          <h3>Manage Users</h3>
        </div>
      </div>
      <div className="inline-flex w-full p-1 bg-grey-darker uppercase text-white text-sm absolute mt-10 pin-t pin-l">
        <div className="w-24 pl-4 uppercase">Number</div>
        <div className="w-1/8 pl-3 uppercase">Username</div>
        <div className="w-1/8 pl-5 uppercase">Badge</div>
        <div className="w-24 pl-4 uppercase">Status</div>
        <div className="w-3/8 pl-4 uppercase">Last Actions</div>
        <div className="w-1/8 text-center uppercase">Lock User</div>
        <div className="w-1/8 text-center uppercase">Admin</div>
        <div className="w-1/8 text-center  uppercase">Delete User</div>
      </div>

      <div className="mt-6" />
      <div className="w-full overflow-y-auto h-650">{showUsers()}</div>

      <Subscription subscription={subscription.userUpdate}>
        {({ data }) => {
          if (data != null) {
            let _user = data.userUpdate;
            let _promptUsers = props.nav.promptUsers;
            if (!JSON.stringify(_promptUsers).includes(JSON.stringify(_user))) {
              props.modifyUser({
                user: _user,
                promptUsers: _promptUsers
              });
            }
          }
          return <div />;
        }}
      </Subscription>
    </div>
  );
};

const subscription = {
  userUpdate: gql`
    subscription {
      userUpdate {
        username
        badge
        locked
        admin
        online
        lastAction
      }
    }
  `
};

export default Users;
