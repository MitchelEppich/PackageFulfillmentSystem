import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfo, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const RegisterUser = props => {
  let showRegisterForm = () => {
    return (
      <div>
        <p className="p-2">Please, insert the information below:</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            const form = e.target;
            const formData = new window.FormData(form);

            let name = formData.get("name");
            let admin = formData.get("admin");

            // Verify login credentials
            props.registerCredentials({ name, admin });
          }}
        >
          <div className="text-center mt-6">
            <div className="p-2">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="p-2 w-2/3"
              />
            </div>
            <div className="p-2 w-full text-left ml-20">
              <input
                type="checkbox"
                name="admin"
                id="admin"
                value="admin"
                className="p-2"
              />
              <label className="p-2">Is the user Administrator?</label>
            </div>
            <button
              type="submit"
              className="bg-blue-new text-white mt-6 p-2 text-center mx-auto w-2/3 justify-center cursor-pointer hover:bg-blue"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  };

  let showCompletion = () => {
    if (props.user.registerUser == null) return;
    let _new = props.user.registerUser;
    return (
      <div>
        <p>Success!</p>
        <div>
          <p>{_new.name.toUpperCase()} has been created.</p>
          <p>Username : {_new.username}</p>
          <p>Badge : {_new.badge}</p>
        </div>
      </div>
    );
  };

  return (
    <div
      className="bg-white h-full w-full relative overflow-x-hidden overflow-y-hidden"
      style={{
        position: "fixed",
        zIndex: "100"
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          background: "whitesmoke",
          zIndex: "60",
          boxShadow: "rgb(206, 206, 206) 0px 2px 5px"
        }}
        className="w-450 h-450 bg-white mt-32 align-absolute text-center"
      >
        <div>
          <FontAwesomeIcon
            icon={faUserPlus}
            className="fa-7x mt-12 mb-6 text-almost-transparent"
          />

          <h1 className="mt-2 p-2">Register New User</h1>
          <div
            onClick={() => {
              props.setVisibleScreen(null);
            }}
            className="absolute pin-t pin-r p-2 mt-2 mr-2 cursor-pointer hover:bg-blue hover:text-white"
          >
            <FontAwesomeIcon icon={faTimes} className="fa-2x" />
          </div>
        </div>
        {props.user.registerUser == null
          ? showRegisterForm()
          : showCompletion()}
      </div>
    </div>
  );
};

export default RegisterUser;
