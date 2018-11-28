import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faInfo,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

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
          {company.short}{" "}
          <span className="qtd-tag"> {company.orders.length}</span>
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
        arr.push(
          <div
            className="inline-flex w-full p-2 items-center  bg-grey-lighter mt-8"
            key={order.invoice_id}
          >
            <div className="w-1/5 pl-2">{index}</div>
            <div className="w-3/5 pl-2">Order #{order.invoice_number}</div>
            <div className="w-1/5 pl-2">
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
        <div className="inline-flex w-full p-2 items-center  bg-grey-lighter mt-8">
          <h2>Please select your company tab . . .</h2>
        </div>
      );
    }
  };

  return (
    <div className="w-full bg-grey-light overflow-x-hidden">
      <div className="bg-blue w-full mx-auto inline-flex justify-center text-white">
        <div className="w-newScreen inline-flex ml-6 mt-4 justify-center mb-2">
          <div className="w-3/4 mt-2">
            <h2 className="text-white p-2">Package Fulfillment System</h2>
            <p className="p-3 ">Welcome {_name}, please select an option:</p>
          </div>
          <div className="w-1/4 mt-6 text-right mr-12">
            <a
              onClick={() => {
                props.releaseCredentials();
                props.toggleLoginScreen();
              }}
              className="text-white p-2 bg-semi-transparent font-bold uppercase cursor-pointer px-4 hover:bg-white hover:text-blue"
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
          style={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px"
          }}
          className="inline-flex w-full bg-blue-new justify-between"
        >
          {showCompanies()}
        </div>

        <div className="inline-block w-full h-650 bg-white text-black overflow-y-auto">
          <div className="inline-flex w-full p-1 bg-grey-darker uppercase text-white text-sm absolute">
            <div className="w-1/5 pl-2">Number</div>
            <div className="w-3/5 pl-2">Order Number</div>
            <div className="w-1/5 text-center mr-4">Action</div>
          </div>
          {showOrders()}
        </div>
      </div>
    </div>
  );
};

export default Main;
