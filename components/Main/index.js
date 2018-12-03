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
  let orderCache = props.nav.orderCache;
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
              orderCache: props.nav.orderCache,
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
            {props.nav.orderCache[company.short.toLowerCase()] != null &&
            props.nav.orderCache[company.short.toLowerCase()].order != null
              ? props.nav.orderCache[company.short.toLowerCase()].order.length
              : -1}
          </span>
        </div>
      );
    }
    return arr;
  };

  let showOrders = () => {
    if (props.nav.focusCompany != null) {
      let orders = props.nav.focusCompany.orders;
      let arr = [];
      let index = 1;
      for (let order of orders) {
        // console.log(order.date)
        arr.push(
          <div
            className="inline-flex w-full p-2 items-center bg-grey-lighter mt-1"
            key={order.invoice_id}
          >
            <div className="w-32 pl-8">{index}</div>
            <div className="w-1/4">Order #{order.invoice_number}</div>
            <div className="w-1/4">{order.date}</div>
            <div className="w-1/4">{props.misc.showScreen ? "In progress by Karl" : null }</div>
            <div className="w-1/4 pl-2">
              <div
                onClick={() => {
                  props.fetchOrder({
                    order: order,
                    user: props.user.currentUser,
                    company: props.nav.focusCompany
                  });
                  props.toggleScreen();
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
            Please select your Company tab...
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
            <a href="./"><h2 className="text-white uppercase p-2">
              Package Fulfillment System
            </h2></a>
            <p className="p-3 ">Welcome {_name}, please select an option:</p>
          </div>
          <div className="w-2/4 mt-6 text-right mr-4">
            {!props.showScreen ? (
              <a
                onClick={() => {
                  props.toggleShowLog();
                  props.fetchLogs();
                }}
                className="text-white p-2 bg-semi-transparent font-bold uppercase cursor-pointer px-4 hover:bg-white hover:text-blue mr-2"
              >
                Users
              </a>
            ) : (
              <a
                onClick={e => {
                  e.preventDefault();
                }}
                className="opacity-25 text-white p-2 unselectable bg-semi-transparent font-bold uppercase cursor-not-allowed px-4 mr-2"
              >
                Users
              </a>
            )}
            {!props.showScreen ? (
              <a
                onClick={() => {
                  props.toggleShowLog();
                  props.fetchLogs();
                }}
                className="text-white p-2 bg-semi-transparent font-bold uppercase cursor-pointer px-4 hover:bg-white hover:text-blue mr-2"
              >
                Logs
              </a>
            ) : (
              <a
                onClick={e => {
                  e.preventDefault();
                }}
                className="opacity-25 text-white p-2 unselectable bg-semi-transparent font-bold uppercase cursor-not-allowed px-4 mr-2"
              >
                Logs
              </a>
            )}

            {!props.showScreen ? (
              <a
                onClick={() => {
                  props.toggleRegisterScreen();
                }}
                className="text-white p-2 bg-semi-transparent font-bold uppercase cursor-pointer px-4 hover:bg-white hover:text-blue mr-2"
              >
                Register New User
              </a>
            ) : (
              <a
                onClick={e => {
                  e.preventDefault();
                }}
                className="opacity-25 text-white p-2 unselectable bg-semi-transparent font-bold uppercase cursor-not-allowed px-4 mr-2"
              >
                Register New User
              </a>
            )}

            {!props.showScreen ? (
              <a
                onClick={() => {
                  props.releaseCredentials();
                  props.toggleLoginScreen();
                }}
                className="text-white p-2 bg-semi-transparent font-bold uppercase cursor-pointer px-4 hover:bg-white hover:text-blue"
              >
                Logout
              </a>
            ) : (
              <a
                onClick={e => {
                  e.preventDefault();
                }}
                className="opacity-25 text-white p-2 unselectable bg-semi-transparent font-bold uppercase cursor-not-allowed px-4"
              >
                Logout
              </a>
            )}
          </div>
        </div>
      </div>
{console.log("call", props)}
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
            console.log("Test");
          }}
          className="p-2 justify-end w-full text-blue-new hover:text-blue cursor-pointer mb-2"
        > 
            <div className="font-bold uppercase w-full text-right mr-1 items-center ">
                <div className="inline-flex items-center mr-2">
                {props.nav.focusCompany !== null ?
                  <span className="mr-6 text-sm text-blue-new text-right font-normal">
                    Last Updated:{" "}
                    {moment(
                          props.nav.orderCache[
                            props.nav.focusCompany.short.toLowerCase()
                          ].updatedAt
                        ).format("hh:mm:ss - DD/MM/YYYY")}
                      
                  </span> : null }   
                      <p className="text-lg mr-2">Update</p>
                      <FontAwesomeIcon icon={faSyncAlt} className="fa-lg" /> 
                </div>
            </div> 
        </div>
        <div
          style={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            overflow: "hidden",
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
