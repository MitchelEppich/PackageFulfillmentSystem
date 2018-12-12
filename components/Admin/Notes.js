import React from "react";
import moment from "moment";

const Notes = props => {
  let showNotes = () => {
    let arr = [];
    let _notes = props.nav.focusOrder.notes;
    if (_notes == null) return null;
    for (let note of _notes) {
      let _content = note.split("//&");
      arr.push(
        <div className="inline-flex w-full p-2 bg-grey-light">
          <div className="w-1/5 text-left pl-6 uppercase">{_content[0]}</div>
          <div className="w-3/5 text-left capitalize">{_content[1]}</div>
          <div className="w-1/5 text-left pl-6 text-sm">
            {moment(_content[2]).format("DD/MM - hh:mm:ss")}
          </div>
        </div>
      );
    }

    return arr;
  };

  return (
    <div
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        overflow: "hidden",
        zIndex: "100",
        boxShadow: "rgba(45, 45, 45, 0.19) 0px 2px 5px",
        marginRight: "5px"
      }}
      className="absolute bg-white pin-r pin-t w-750 h-550 mt-12"
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
            let _noteEntry = document.querySelector("#noteEntry").value;
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
          <div className="bg-blue-new p-2 text-white text-center uppercase cursor-pointer">
            Send
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
