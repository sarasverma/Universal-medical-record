import React from "react";
import Wrapper from "./FormStyle";

const New = () => {
  return (
    <Wrapper>
      <div className="container">
        <header>Patient Details</header>
        <form>
          <div className="form first">
            <div className="details Disease">
              <span className="" title="">
                Medical Details
              </span>
              <br />
              <br />
              <div className="fields">
                <div className="input-field">
                  <label>Disease Name</label>
                  <input
                    type="text"
                    placeholder="Enter Disease name"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Hospital Name</label>
                  <input
                    type="text"
                    placeholder="Enter hospital name"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Doctor Name</label>
                  <input
                    type="text"
                    placeholder="Enter Doctor Name"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Test Date</label>
                  <input
                    type="date"
                    placeholder="Enter test date"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Medicine Prescribed</label>
                  <input
                    type="text"
                    placeholder="Enter medicine prescribed"
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Any Allergy</label>
                  <input
                    type="text"
                    placeholder="Enter allergy if any "
                    required=""
                  />
                </div>
                <div className="input-field">
                  <label>Recovery Date</label>
                  <input
                    type="date"
                    placeholder="Enter test date"
                    required=""
                  />
                </div>
                <div>
                  <label htmlFor="file-upload">Select a file to upload:</label>
                  <input
                    type="file"
                    id="file-upload"
                    name="file-upload"
                    accept="image/*,application/pdf"
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

export default New;
