import React from "react";
import Wrapper from "./FormStyle";

const Account = () => {
  return (
    <Wrapper>
      <div className="container">
        <header>Your information</header>
        <form>
          <div className="form first">
            <div className="details personal">
              <span className="" title="">
                Personal Details
              </span>
              <div className="fields">
                <div className="input-field">
                  <label>Fulle Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    placeholder="Enter birth date"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="gender">Select your gender</label>
                  <select className="gend" name="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">other</option>
                  </select>
                </div>
                <div className="input-field">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Mobile Number</label>
                  <input
                    type="number"
                    placeholder="Enter your mobile number"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Weight</label>
                  <input
                    type="number"
                    placeholder="Enter your weight"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Height</label>
                  <input
                    type="number"
                    placeholder="Enter your height"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Occupation</label>
                  <input
                    type="text"
                    placeholder="Enter your occupation"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Enter your Address"
                    required=""
                  />
                </div>
              </div>
            </div>
            <button className="nextbtn" type="submit">
              <span className="btnText">Submit</span>
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Account;
