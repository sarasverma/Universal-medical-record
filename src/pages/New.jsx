import React, { useContext, useState, useEffect } from "react";
import Wrapper from "./styles/FormStyle";
import { AiFillFileAdd } from "react-icons/ai";
import { Web3Context } from "../context/Web3Context";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";

const New = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    diseaseName: "",
    hospitalName: "",
    doctorName: "",
    testDate: "",
    medicinePrescribed: "",
    recoveryDate: "",
    medicalFile: null,
  });
  const [checkSlug, setCheckSlug] = useState(false);

  const {
    diseaseName,
    hospitalName,
    doctorName,
    testDate,
    medicinePrescribed,
    recoveryDate,
    medicalFile,
  } = formData;

  const { files, uploadFile, retrieveFile } = useContext(Web3Context);
  const { currentUser } = useContext(AuthContext);

  const { email } = useParams(); // for getting email slug

  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        console.log(email, currentUser.email);
        // check whether current user is in the access list of email
        const res = await getDoc(doc(db, "userSetting", email));
        if (res.exists()) {
          const data = res.data();
          const accessList = data.access;
          if (accessList.includes(currentUser.email)) {
            setCheckSlug(true);
          } else {
            toast.error("Access denied");
            navigate("/");
          }
        } else {
          toast.error("URL doesn't exist");
          navigate("/");
        }
      } catch (e) {
        toast.error(e);
      }
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // console.log(email);
    if (email) {
      if (regex.test(email)) {
        setIsLoading(true);
        getData();
        setIsLoading(false);
      } else {
        toast.error("URL does't exist");
        navigate("/");
      }
    }
  }, [email, checkSlug]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onChangeRegisterFile = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const cid = await uploadFile(medicalFile);

      // update for patient
      const patient = email && checkSlug ? email : currentUser.email;
      await updateDoc(doc(db, "userSetting", patient), {
        cids: arrayUnion(cid),
      });

      // store cid metadata
      await setDoc(doc(db, "cidMetaData", cid), {
        cid: cid,
        name: medicalFile[0].name,
        metaData: {
          diseaseName,
          hospitalName,
          doctorName,
          testDate,
          medicinePrescribed,
          recoveryDate,
        },
      });

      setIsLoading(false);
      toast.success("Successfully uploaded !");
      setFormData({
        diseaseName: "",
        hospitalName: "",
        doctorName: "",
        testDate: "",
        medicinePrescribed: "",
        recoveryDate: "",
        medicalFile: null,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
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
        <div className="container">
          <header>
            <div>
              New Details <AiFillFileAdd />
            </div>
            <span style={{ textAlign: "center" }}>
              {console.log(email, checkSlug)}
              {email && checkSlug ? email : currentUser.email}
            </span>
          </header>
          <form onSubmit={handleSubmit}>
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
                      name="diseaseName"
                      value={diseaseName}
                      onChange={handleOnChange}
                      placeholder="Enter Disease name"
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Hospital Name</label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={hospitalName}
                      onChange={handleOnChange}
                      placeholder="Enter hospital name"
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Doctor Name</label>
                    <input
                      type="text"
                      name="doctorName"
                      value={doctorName}
                      onChange={handleOnChange}
                      placeholder="Enter Doctor Name"
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Test Date</label>
                    <input
                      type="date"
                      name="testDate"
                      value={testDate}
                      onChange={handleOnChange}
                      placeholder="Enter test date"
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Recovery Date (only if recovered)</label>
                    <input
                      type="date"
                      name="recoveryDate"
                      value={recoveryDate}
                      onChange={handleOnChange}
                      placeholder="Enter test date"
                    />
                  </div>
                  <div className="input-field">
                    <label>Medicine Prescribed</label>
                    <input
                      type="text"
                      name="medicinePrescribed"
                      value={medicinePrescribed}
                      onChange={handleOnChange}
                      placeholder="Enter medicine prescribed"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="medicalFile">
                      {`${
                        medicalFile
                          ? medicalFile[0].name
                          : "Add a medical file 📁"
                      }`}
                    </label>
                    <input
                      type="file"
                      id="medicalFile"
                      name="medicalFile"
                      accept="image/*,application/pdf"
                      style={{ display: "none" }}
                      onChange={onChangeRegisterFile}
                      required
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
      )}
    </Wrapper>
  );
};

export default New;
