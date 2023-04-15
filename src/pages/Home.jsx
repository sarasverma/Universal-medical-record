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
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cids, setCids] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCid, setModalCid] = useState({});

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const res = await getDoc(doc(db, "userSetting", currentUser.email));
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
              new Date(a.metaData.testDate) - new Date(b.metaData.testDate)
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
                <h3 className="heading">Your medical History </h3>
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
