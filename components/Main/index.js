import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faInfo,
  faInfoCircle,
  faSyncAlt,
  faDownload
} from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

library.add(faPlus, faMinus, faInfo);

const Main = props => {
  let companies = props.misc.companies;
  let _name =
    props.user.currentUser != null ? props.user.currentUser.name : "NO NAME";

  let showCompanies = () => {
    let arr = [];
    for (let company of companies) {
      arr.push(
        <div
          key={company.short}
          onClick={() => {
            props.focusCompany({
              company: company,
              orderCache: props.order.orderCache,
              user: props.user.currentUser
            });
          }}
          className={`${
            props.nav.focusCompany != null &&
            props.nav.focusCompany.id == company.id
              ? "bg-red hover:bg-red-dark"
              : "hover:bg-semi-transparent"
          } w-1/8 p-2 justify-center border-semi-transparent h-10 flex items-center border-r-2 font-bold cursor-pointer leading-normal leading-normal uppercase`}
        >
          {" "}
          <p className="pr-2">{company.short}</p>{" "}
          <span className="qtd-tag flex justify-center">
            {" "}
            {props.order.orderCache[company.short.toLowerCase()] != null &&
            props.order.orderCache[company.short.toLowerCase()].order !=
              null ? (
              <p
                style={{
                  marginTop: "1px"
                }}
              >
                {
                  props.order.orderCache[company.short.toLowerCase()].order
                    .length
                }
              </p>
            ) : (
              <FontAwesomeIcon
                icon={faSyncAlt}
                className="fa-lg loader-icon"
                style={{
                  marginTop: "2px"
                }}
              />
            )}
          </span>
        </div>
      );
    }
    return arr;
  };

  let showOrders = () => {
    if (props.nav.focusCompany != null && props.order.orderCache != null) {
      let orders = props.order.orderCache[props.nav.focusCompany.short].order;
      let arr = [];
      let index = 1;

      if (orders == null)
        return (
          <div className="inline-flex w-full p-2 text-center bg-grey-lighter mt-2">
            <h3 className="text-center w-full text-almost-transparent">
              Error loading orders . . .
            </h3>
          </div>
        );

      for (let order of orders) {
        arr.push(
          <div
            className="inline-flex w-full p-2 items-center bg-grey-lighter mt-1"
            key={order.invoice_id}
          >
            <div className="w-32 pl-8">{index}</div>
            <div className="w-1/4">Order #{order.invoice_number}</div>
            <div className="w-1/4">{order.date}</div>
            <div className="w-1/4">
              {order.status != null && order.editBy != null
                ? `${order.status} by ${order.editBy[order.editBy.length - 1]}`
                : null}
            </div>
            <div className="w-1/4 pl-2">
              <div
                onClick={() => {
                  props.fetchOrder({
                    order: order,
                    user: props.user.currentUser,
                    company: props.nav.focusCompany,
                    orderCache: props.order.orderCache
                  });
                  props.setVisibleScreen(["itemized"]);
                }}
                className="uppercase bg-blue-new text-white text-center px-3 py-2 cursor-pointer hover:bg-blue"
              >
                Claim
              </div>
            </div>
          </div>
        );
        index++;
      }
      return arr;
    } else {
      return (
        <div className="inline-flex w-full p-2 text-center bg-grey-lighter mt-2">
          <h3 className="text-center w-full text-almost-transparent">
            Please select your Company tab . . .
          </h3>
        </div>
      );
    }
  };

  return (
    <div className="w-full bg-grey-light overflow-x-hidden">
      <div className="bg-blue-new w-full mx-auto inline-flex justify-center text-white">
        <div className="w-newScreen inline-flex ml-6 mt-4 flex justify-between mb-2">
          <div className="w-2/4 mt-2 pin-l text-left">
            <a href="./">
              <h2 className="text-white uppercase p-2">
                Package Fulfillment System
              </h2>
            </a>
            <p className="p-3 ">Welcome {_name}, please select an option:</p>
          </div>
          <div className="w-2/4 mt-6 text-right mr-4">
            <a
              onClick={() => {
                props.setVisibleScreen([
                  props.misc.visibleScreen != null &&
                  props.misc.visibleScreen.includes("users")
                    ? null
                    : "users"
                ]);
                props.fetchUsers();
              }}
              className={
                props.misc.visibleScreen == null
                  ? "text-white p-2 bg-semi-transparent unselectable font-bold uppercase cursor-pointer px-4 hover:bg-white hover:text-blue mr-2"
                  : "opacity-25 text-white p-2 unselectable bg-semi-transparent font-bold uppercase cursor-not-allowed px-4 mr-2"
              }
            >
              Users
            </a>

            <a
              onClick={() => {
                props.setVisibleScreen([
                  props.misc.visibleScreen != null &&
                  props.misc.visibleScreen.includes("logs")
                    ? null
                    : "logs"
                ]);
                props.fetchLogs();
              }}
              className={
                true //props.misc.visibleScreen == null
                  ? "text-white p-2 bg-semi-transparent unselectable font-bold uppercase cursor-pointer px-4 hover:bg-white hover:text-blue mr-2 "
                  : "opacity-25 text-white p-2 unselectable bg-semi-transparent font-bold uppercase cursor-not-allowed px-4 mr-2"
              }
            >
              Logs
            </a>

            <a
              onClick={() => {
                props.setVisibleScreen([
                  props.misc.visibleScreen != null &&
                  props.misc.visibleScreen.includes("register")
                    ? null
                    : "register"
                ]);
              }}
              className={
                props.misc.visibleScreen == null
                  ? "text-white p-2 bg-semi-transparent unselectable font-bold uppercase cursor-pointer px-4 hover:bg-white hover:text-blue mr-2"
                  : "opacity-25 text-white p-2 unselectable bg-semi-transparent font-bold uppercase cursor-not-allowed px-4 mr-2"
              }
            >
              Register New User
            </a>

            <a
              onClick={() => {
                props.releaseCredentials();
                props.setVisibleScreen([
                  props.misc.visibleScreen != null &&
                  props.misc.visibleScreen.includes("login")
                    ? null
                    : "login"
                ]);
              }}
              className={
                props.misc.visibleScreen == null
                  ? "text-white p-2 bg-semi-transparent unselectable font-bold uppercase cursor-pointer px-4 hover:bg-white hover:text-blue"
                  : "opacity-25 text-white p-2 unselectable bg-semi-transparent font-bold uppercase cursor-not-allowed px-4"
              }
            >
              Logout
            </a>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: "0",
          right: "0",
          height: "800px"
        }}
        className="w-newScreen h-halfscreen text-white mt-16"
      >
        <div
          onClick={() => {
            let company = props.nav.focusCompany;
            if (company == null) return;
            let updateIcon = document.querySelector("#update-icon");
            updateIcon.classList.add("loader-icon");
            props
              .fetchOrderList({
                url: company.url,
                company: company,
                orderCache: props.order.orderCache,
                user: null
              })
              .then(res => {
                updateIcon.classList.remove("loader-icon");
              });
          }}
          className="p-2 justify-end w-full text-blue-new hover:text-blue cursor-pointer mb-2"
        >
          <div className="font-bold uppercase w-full text-right mr-1 items-center ">
            {props.nav.focusCompany !== null ? (
              <div className="inline-flex items-center mr-2">
                <span className="mr-6 text-sm text-blue-new text-right font-normal">
                  Last Updated:{" "}
                  {moment(
                    props.order.orderCache[
                      props.nav.focusCompany.short.toLowerCase()
                    ].updatedAt
                  ).format("hh:mm:ss - DD/MM/YYYY")}
                </span>
                <p className="text-lg mr-2">Update</p>
                <FontAwesomeIcon
                  icon={faSyncAlt}
                  className="fa-lg"
                  id="update-icon"
                />
              </div>
            ) : null}
          </div>
        </div>
        <div
          style={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            overflow: "hidden"
          }}
          className="inline-flex w-full bg-blue-new justify-between"
        >
          {showCompanies()}
        </div>

        <div className="inline-block w-full h-650 bg-white text-black overflow-y-auto">
          <div className="inline-flex w-full p-1 bg-grey-darker uppercase text-white text-sm absolute">
            <div className="w-32 pl-4">Number</div>
            <div className="w-1/4 pl-4">Order Number</div>
            <div className="w-1/4 pl-8">Date</div>
            <div className="w-1/4 pl-16">Status</div>
            <div className="w-1/4 pl-32 mr-4">Action</div>
          </div>
          <div className="mt-6" />
          {showOrders()}
        </div>
      </div>
    </div>
  );
};

export default Main;
