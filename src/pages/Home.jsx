import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Wrapper from "./styles/HomeStyle";
import { HashLoader } from "react-spinners";
import { MdAddCircle } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cids, setCids] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCid, setModalCid] = useState({});

  const [checkSlug, setCheckSlug] = useState(false);

  const { email } = useParams(); // for getting email slug
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function validateAccess() {
      try {
        // check whether current user is in the access list of email
        const res = await getDoc(doc(db, "userSetting", email));
        if (res.exists()) {
          const data = res.data();
          const accessList = data.access;
          if (accessList.includes(currentUser.email)) {
            setCheckSlug(true);
            return true;
          } else {
            toast.error("Access denied");
            navigate("/");
          }
        } else {
          toast.error("URL doesn't exist");
          navigate("/");
        }
      } catch (e) {
        return false;
        toast.error(e);
      }
    }

    async function getData() {
      try {
        setIsLoading(true);

        // console.log(email);
        let condition = false;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email) {
          if (regex.test(email)) {
            condition = await validateAccess();
          } else {
            toast.error("URL does't exist");
            navigate("/");
          }
        }

        // console.log(condition);
        const user = condition ? email : currentUser.email;

        const res = await getDoc(doc(db, "userSetting", user));
        if (res.exists()) {
          const cidList = res.data().cids;

          const cidMetaList = [];
          const q = query(
            collection(db, "cidMetaData"),
            where("cid", "in", cidList)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            cidMetaList.push(doc.data());
          });

          cidMetaList.sort(
            (a, b) =>
              new Date(b.metaData.testDate) - new Date(a.metaData.testDate)
          );
          // console.log(cidMetaList);
          setCids(cidMetaList);

          setIsLoading(false);
        } else {
          console.log("No record");
        }
      } catch (e) {
        setIsLoading(false);
        toast.error(e);
      }
    }

    getData();
  }, []);

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <div className="loader">
            <HashLoader
              color="#76d636"
              loading={isLoading}
              cssOverride=""
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            {cids.length == 0 ? (
              <div className="empty">
                <MdAddCircle style={{ fontSize: "100px" }} />
                <h2>
                  <Link to="/new">Add medical file &gt;</Link>
                </h2>
              </div>
            ) : (
              <div className="main">
                <h3 className="heading">
                  {`${checkSlug && email ? email : "Your"} medical History`}{" "}
                </h3>
                <div className="container">
                  <ul>
                    {cids.map((cid) => (
                      <li key={cid.cid}>
                        <h3 className="title">{cid.metaData.diseaseName}</h3>
                        <div>
                          <p>👨‍⚕️ Doctor name :- {cid.metaData.doctorName}</p>
                          <p>🏥 Hospital name :- {cid.metaData.hospitalName}</p>
                          <p>
                            💊 Medicine :- {cid.metaData.medicinePrescribed}
                          </p>
                          <p>📅 Recovery date :- {cid.metaData.recoveryDate}</p>
                        </div>
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setModalCid({ cid: cid.cid, name: cid.name });
                            setModalOpen(true);
                          }}
                        >
                          See medical file &gt;
                        </a>
                        <span className="circle" />
                        <span className="date">{cid.metaData.testDate}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </Wrapper>
      {modalOpen && <Modal setOpenModal={setModalOpen} cidInfo={modalCid} />}
    </>
  );
};

export default Home;
