import React, { useState, useEffect } from "react";
import Wrapper from "./styles/FormStyle";
import { FaUserAlt } from "react-icons/fa";
import UserInfo from "../components/UserInfo";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

const Account = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    dob: "",
    role: "patient",
    gender: "male",
    weight: "",
    height: "",
    bloodGroup: "",
    mobileNo: "",
    occupation: "",
    address: "",
  });
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const res = await getDoc(doc(db, "userInfo", currentUser.email));
        if (res.exists()) {
          const data = res.data();
          setIsLoading(false);
          setFormData({ ...formData, ...data });
          // console.log(data);
          // console.log(formData);
        }
      } catch (e) {
        setIsLoading(false);
        toast.error(e);
      }
    }
    getData();
  }, []);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const {
      dob,
      role,
      gender,
      weight,
      height,
      bloodGroup,
      mobileNo,
      occupation,
      address,
    } = formData;
    try {
      await updateDoc(doc(db, "userInfo", currentUser.email), {
        dob,
        role,
        gender,
        weight,
        height,
        bloodGroup,
        mobileNo,
        occupation,
        address,
      });
      setIsLoading(false);
      toast.success("Information updated successfully");
    } catch (e) {
      setIsLoading(false);
      toast.error(`Error : ${e}`);
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <HashLoader
          color="#76d636"
          loading={isLoading}
          cssOverride=""
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <UserInfo />
          <div className="container">
            <header>
              Your information <FaUserAlt />
            </header>
            <form onSubmit={handleSubmit}>
              <div className="form first">
                <div className="details personal">
                  <span className="" title="">
                    Personal Details
                  </span>
                  <div className="fields">
                    <div className="input-field">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        placeholder="Enter birth date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="role">Select your role</label>
                      <select
                        className="gend"
                        name="role"
                        value={formData.role}
                        onChange={handleOnChange}
                      >
                        <option value="patient">patient</option>
                        <option value="doctor">doctor</option>
                      </select>
                    </div>
                    <div className="input-field">
                      <label htmlFor="gender">Select your gender</label>
                      <select
                        className="gend"
                        name="gender"
                        value={formData.gender}
                        onChange={handleOnChange}
                      >
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="other">others</option>
                      </select>
                    </div>
                    <div className="input-field">
                      <label>Weight</label>
                      <input
                        type="text"
                        placeholder="Enter your weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Height</label>
                      <input
                        type="text"
                        placeholder="Enter your height"
                        name="height"
                        value={formData.height}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Blood group</label>
                      <input
                        type="text"
                        placeholder="Enter your Blood group"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Mobile Number</label>
                      <input
                        type="text"
                        minLength={10}
                        placeholder="Enter your mobile number"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Occupation</label>
                      <input
                        type="text"
                        placeholder="Enter your occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Address</label>
                      <input
                        type="text"
                        placeholder="Enter your Address"
                        name="address"
                        value={formData.address}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <button className="nextbtn" type="submit">
                  <span className="btnText">Update</span>
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Account;
