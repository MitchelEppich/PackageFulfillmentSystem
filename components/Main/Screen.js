import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faInfo,
  faAngleLeft,
  faAngleDown,
  faUser,
  faAngleUp,
  faAngleRight,
  faStickyNote
} from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

const Screen = props => {
  let generateSingleItem = (item, company) => {
    let _value =
      props.item.itemValues[item.name] != null
        ? props.item.itemValues[item.name].value
        : undefined;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: " center",
          alignItems: " center"
        }}
        className={`inline-flex flex items-center pl-12 w-full mx-auto my-2 p-1`}
        key={item.name}
      >
        <div style={{ width: "40%" }} className="">
          <p className="text-lg ml-6">{item.description}</p>
        </div>
        <div
          style={{
            width: "80px",
            height: "30px",
            borderRadius: "5px",
            border: "1px solid rgba(21, 21, 21, 0.32)"
          }}
          className={`bg-${props.misc.geneColors[item.type]} p-2 w-full`}
        />
        <div style={{ width: "15%" }} className="">
          <p className="text-lg ml-12">{item.name}</p>
        </div>
        <div
          style={{ width: "30%" }}
          className="inline-flex ml-4 flex items-center"
        >
          <div style={{ width: "140px" }}>
            <label className="mr-2">Complete here:</label>
          </div>
          <div>
            <p className="">
              {company}04
              <input
                type="number"
                onChange={e => {
                  if (e.target.value.toString().length > 4)
                    e.target.value = e.target.value.substr(0, 4);

                  props.setItemValue({
                    itemValues: props.item.itemValues,
                    key: `${item.name}`,
                    value: e.target.value
                  });
                }}
                value={_value}
                size="3"
                name="sttNumber"
                placeholder="XXXX"
                className={`ml-2 p-3 px-1 w-16 ${
                  props.item.missedItems.includes(item.name) ? "bg-red" : ""
                }`}
              />
            </p>
          </div>
        </div>
        <div style={{ width: "9%" }} className="">
          <p className="flex items-center pl-4 float-right">
            {item.quantity} Package
          </p>
        </div>
      </div>
    );
  };

  let generateSubItem = (itemRef, number, name, value) => {
    let _used = false;
    let item = (
      <div
        className="bg-semi-transparent w-full flex items-center mt-1 h-12 inline-flex"
        key={`${name}${number + 1}`}
      >
        <div style={{ width: "73%" }} className="ml-1 pl-16">
          <p>Package #{number + 1}</p>
        </div>
        <div className="w-1/2 inline-flex flex pl-6 ml-1 items-center">
          <div style={{ width: "140px" }}>
            <label className="mr-2">Complete here:</label>
          </div>
          <div>
            <p className="">
              {props.nav.focusCompany.id}04
              <input
                type="number"
                value={value}
                onChange={e => {
                  if (e.target.value.toString().length > 4)
                    e.target.value = e.target.value.substr(0, 4);

                  props.setItemValue({
                    itemValues: props.item.itemValues,
                    key: `${name}-${number}`,
                    value: e.target.value
                  });
                }}
                onBlur={() => {
                  props.setMultiItemBase({
                    key: name,
                    value: props.item.itemBaseList[name],
                    itemBaseList: props.item.itemBaseList,
                    itemValues: props.item.itemValues,
                    item: itemRef
                  });
                }}
                size="3"
                name="sttNumber"
                placeholder="XXXX"
                className={`ml-2 p-3 px-1 w-16 ${
                  props.item.missedItems.includes(`${name}-${number}`)
                    ? "bg-red"
                    : ""
                }`}
              />
            </p>
          </div>
        </div>
      </div>
    );
    return { item, used: _used };
  };

  let generateMultiItem = (item, company) => {
    let _value = props.item.itemBaseList[item.name]
      ? props.item.itemBaseList[item.name].value
      : undefined;
    let arr = [];
    for (let i = 0; i < item.quantity; i++) {
      let valueEntry =
        props.item.itemValues[`${item.name}-${i}`] != null
          ? props.item.itemValues[`${item.name}-${i}`].value
          : undefined;
      let _sub = generateSubItem(
        item,
        i,
        item.name,
        valueEntry != null ? valueEntry.value : ""
      );
      if (_sub.used) values.shift();
      arr.push(_sub.item);
    }
    return (
      <div
        className="items-center w-full mx-auto pl-12 my-2 p-1"
        key={item.name}
      >
        <div className="inline-flex w-full flex items-center">
          <div
            style={{
              width: "40%"
            }}
            className="flex items-center cursor-pointer hover:opacity-50"
            onClick={() => {
              props.expandItem({
                item: item.name,
                expandItems: props.item.expandItems
              });
            }}
          >
            <p className="text-lg ml-5 flex items-center">
              {props.item.expandItems.includes(item.name) ? (
                <FontAwesomeIcon icon={faAngleDown} className="fa-lg mr-2" />
              ) : (
                <FontAwesomeIcon icon={faAngleRight} className="fa-lg mr-2" />
              )}
              {item.description}
            </p>
          </div>
          <div
            style={{
              width: "80px",
              height: "30px",
              borderRadius: "5px",
              border: "1px solid rgba(21, 21, 21, 0.32)"
            }}
            className={`bg-${props.misc.geneColors[item.type]} p-2 w-full`}
          />
          <div
            style={{
              width: "15%"
            }}
            className=""
          >
            <p className="text-lg ml-12">{item.name}</p>
          </div>

          <div
            style={{
              width: "30%"
            }}
            className="ml-4 flex items-center inline-flex"
          >
            <div style={{ width: "140px" }}>
              <label className="mr-2">Insert Base Value:</label>
            </div>
            <div>
              <p className="">
                {company}04
                <input
                  type="number"
                  value={_value}
                  onChange={e => {
                    if (e.target.value.toString().length > 4)
                      e.target.value = e.target.value.substr(0, 4);

                    props.setMultiItemBase({
                      key: item.name,
                      value: e.target.value,
                      itemBaseList: props.item.itemBaseList,
                      itemValues: props.item.itemValues,
                      item: item
                    });
                  }}
                  size="30"
                  name="rangeMin"
                  placeholder="XXXX"
                  maxLength="4"
                  className={`p-3 ml-2 px-1 mr-5  w-16 ${
                    props.item.missedItems.includes(`${item.name}-0`)
                      ? "bg-orange"
                      : ""
                  }`}
                />
              </p>
            </div>
          </div>
          <div
            style={{
              width: "9%"
            }}
            className=""
          >
            <p className="flex items-center float-right">
              {item.quantity} Packages
            </p>
          </div>
        </div>
        {props.item.expandItems.includes(item.name) ? (
          <div className="w-full overflow-y-auto mt-2 mx-0 bg-grey-light ">
            {arr}
          </div>
        ) : null}
      </div>
    );
  };

  let populateItems = itemList => {
    let companies = [];
    for (let company in itemList) {
      let quantities = [];

      let _companyId;
      for (let _company of props.misc.companies) {
        if (_company.short == company.toLowerCase()) {
          _companyId = _company.id;
          break;
        }
      }

      for (let quantity in itemList[company]) {
        let items = [];
        for (let item of Object.values(itemList[company][quantity])) {
          items.push(
            <div>
              {item.quantity == 1
                ? generateSingleItem(item, _companyId)
                : generateMultiItem(item, _companyId)}
            </div>
          );
        }
        let key = `${company}-${quantity}`;

        let len = Object.keys(props.nav.focusOrder.itemList[company][quantity]);
        let qty = len.length;

        quantities.push(
          <div>
            <div
              className="w-full cursor-pointer mt-2 p-2 pl-10 text-lg mx-0 bg-grey-light hover:bg-grey-lighter"
              onClick={() => {
                props.expandItem({
                  item: key,
                  expandItems: props.item.expandItems
                });
              }}
            >
              <span>
                {props.item.expandItems.includes(key) ? (
                  <FontAwesomeIcon icon={faAngleDown} className="fa-lg mr-2" />
                ) : (
                  <FontAwesomeIcon icon={faAngleRight} className="fa-lg mr-2" />
                )}
                {quantity} Packs
              </span>

              <span className="text-right text-grey-dark pin-r">
                {" "}
                - ({qty} {qty == 1 ? "Item" : "Items"})
              </span>
            </div>
            {props.item.expandItems.includes(key) ? items : null}
          </div>
        );
      }
      let key = company;
      companies.push(
        <div>
          <div
            className="w-full cursor-pointer mt-2 p-2 pl-6 text-lg mx-0 bg-blue-darker text-white hover:bg-grey-dark"
            onClick={() => {
              props.expandItem({
                item: key,
                expandItems: props.item.expandItems
              });
            }}
          >
            <FontAwesomeIcon
              icon={
                props.item.expandItems.includes(key)
                  ? faAngleDown
                  : faAngleRight
              }
              className="fa-lg mr-2"
            />
            {company}
          </div>
          {props.item.expandItems.includes(key) ? quantities : null}
        </div>
      );
    }

    return companies;
  };

  let showEditors = () => {
    let arr = [];
    let _editBy = props.nav.focusOrder.editBy;
    if (_editBy == null) return null;
    for (let user of _editBy) {
      arr.push(
        <div className="float-left w-full mt-1 p-2">
          <p className="text-center">{user}</p>
        </div>
      );
    }

    return arr;
  };

  let showNotes = () => {
    let arr = [];
    let _notes = props.nav.focusOrder.notes;
    if (_notes == null) return null;
    for (let note of _notes) {
      let _content = note.split("//&");
      arr.push(
        <div className="inline-flex w-full p-2 bg-grey-light">
          <div className="w-1/5 text-left pl-6">{_content[0]}</div>
          <div className="w-3/5 text-left">{_content[1]}</div>
          <div className="w-1/5 text-left pl-6">
            {moment(_content[2]).format("DD-MM-YYYY hh:mm:ss")}
          </div>
        </div>
      );
    }

    return arr;
  };

  let showOrder = () => {
    let order = props.nav.focusOrder;
    if (order == null) return;
    return (
      <div>
        <div className="w-full bg-blue-new h-10 mb-6 inline-flex flex items-center">
          <div
            onClick={() => {
              props.updateOrder({
                status: "awaiting completion",
                claimed: false,
                entryContent: JSON.stringify(props.item.itemValues),
                invoiceNumber: order.invoiceNumber,
                orderCache: props.order.orderCache
              });
              props.setVisibleScreen(null);
              props.clearItem();
            }}
            className="w-1/3 h-10 inline-flex"
          >
            <h4 className="p-2 text-white px-4  uppercase text-lg bg-red flex items-center hover:bg-semi-transparent cursor-pointer">
              <FontAwesomeIcon icon={faAngleLeft} className="fa-2x mr-4" />
              Back
            </h4>
          </div>
          <div className="w-1/3 text-center text-white font-bold text-lg">
            <p>{props.nav.focusCompany.name.toUpperCase()}</p>
          </div>
          <div className="w-1/3 text-right inline-flex relative">
            <div className="text-right w-full">
              <h4 className="p-2 text-white uppercase text-lg">
                #{order.invoiceNumber} order
              </h4>
            </div>
            <span
              onClick={() => {
                props.setVisibleScreen(
                  props.misc.visibleScreen.includes("editBy")
                    ? ["itemized"]
                    : ["editBy", ...props.misc.visibleScreen]
                );
              }}
              style={{
                borderRadius: "30%",
                width: "28px",
                height: "28px",
                marginTop: "4px",
                padding: "6px",
                fontSize: "17px"
              }}
              className="flex justify-center bg-almost-white mr-4 hover:bg-white cursor-pointer"
            >
              <FontAwesomeIcon icon={faUser} />
            </span>

            <span
              onClick={() => {
                props.setVisibleScreen(
                  props.misc.visibleScreen.includes("noteBy")
                    ? ["itemized"]
                    : ["noteBy", ...props.misc.visibleScreen]
                );
              }}
              style={{
                borderRadius: "30%",
                width: "28px",
                height: "28px",
                marginTop: "4px",
                padding: "6px",
                fontSize: "17px"
              }}
              className="flex justify-center bg-almost-white mr-4 hover:bg-white cursor-pointer"
            >
              <FontAwesomeIcon icon={faStickyNote} />
            </span>

            {props.misc.visibleScreen.includes("noteBy") ? (
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  overflow: "hidden",
                  zIndex: "100",
                  boxShadow: "rgba(45, 45, 45, 0.19) 0px 2px 5px",
                  marginRight: "5px"
                }}
                className="absolute bg-white pin-r pin-t w-550 h-550 mt-12"
              >
                <div className="text-white p-2 text-center uppercase bg-blue-new">
                  <h3>Notes</h3>
                </div>
                <div className="w-full mt-6 py-2 h-300 overflow-y-auto">
                  <div
                    style={{ marginTop: "35px" }}
                    className="inline-flex w-full absolute pin-l pin-t p-1 bg-grey-darker uppercase text-white text-sm"
                  >
                    <div className="w-1/5 pl-8 text-left">User</div>
                    <div className="w-3/5 text-left">Message</div>
                    <div className="w-1/5 text-center">Date</div>
                  </div>

                  <div className="w-full inline-block mt-1">{showNotes()}</div>
                </div>
                <div className="w-full h-200 mt-4 p-2">
                  <div className="w-full px-8">
                    <textarea
                      style={{ border: "2px solid #cecece" }}
                      rows="5"
                      cols="40"
                      className="w-full mr-2"
                      id="noteEntry"
                    />
                  </div>
                  <div
                    className="w-full px-8"
                    onClick={() => {
                      let _noteEntry = document.querySelector("#noteEntry")
                        .value;
                      document.querySelector("#noteEntry").value = "";
                      props.updateOrder({
                        note: `${
                          props.user.currentUser.username
                        }//&${_noteEntry}//&${new Date()}`,
                        invoiceNumber: order.invoiceNumber,
                        orderCache: props.order.orderCache
                      });
                    }}
                  >
                    <div className="bg-blue-new p-2 text-white text-center uppercase">
                      Send
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {props.misc.visibleScreen.includes("editBy") ? (
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  overflow: "hidden",
                  zIndex: "100",
                  boxShadow: "rgba(45, 45, 45, 0.19) 0px 2px 5px",
                  marginRight: "5px"
                }}
                className="absolute bg-white pin-r pin-t w-300 h-200 mt-12"
              >
                <div className="text-white p-2 text-center uppercase bg-blue-new">
                  <h3>Edited by:</h3>
                </div>
                <div className="float-left w-full mt-1 p-2 h-200 overflow-y-auto">
                  {showEditors()}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="inline-block w-full h-650 bg-white text-black overflow-y-auto">
          <div className="inline-flex w-full absolute pin-l pin-t p-1 mt-10 bg-grey-darker uppercase text-white text-sm">
            <div style={{ width: "40%" }} className="w-1/4 pl-24">
              Description
            </div>
            <div style={{ width: "5%" }} className="w-1/4 pl-6">
              Color
            </div>
            <div style={{ width: "15%" }} className="w-1/4 pl-20">
              Strain Code
            </div>
            <div style={{ width: "30%" }} className="w-1/4 pl-24">
              STT Number
            </div>
            <div style={{ width: "10%" }} className="w-1/4 pl-8">
              Quantity
            </div>
          </div>
          {populateItems(order.itemList)}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        overflow: "hidden",
        overflow: "hidden",
        background: "whitesmoke",
        boxShadow: "0px 0px 10px #cecece"
      }}
      className="w-newScreen h-newScreen bg-white z-50 mt-16 align-absolute"
    >
      {showOrder()}
      <div
        className="w-40 p-1 pin-b pin-r bg-blue-new absolute mr-6 mb-3 mt-2 cursor-pointer hover:bg-blue"
        onClick={() => {
          props.verifyItemList({
            itemList: props.item.itemValues,
            order: props.nav.focusOrder
          });
        }}
      >
        <p className="uppercase p-2 text-center text-white font-bold">
          Finalize
        </p>
      </div>
      <div className="p-1 pin-b pin-l ml-4 text-black absolute mr-8 mb-4">
        {" "}
        <p>
          Total Packages:{" "}
          {props.nav.focusOrder != null ? props.nav.focusOrder.totalItems : ""}
        </p>
      </div>{" "}
    </div>
  );
};

export default Screen;
