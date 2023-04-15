import React, { useEffect, useState, useContext } from "react";
import "./Modal.css";
import { HashLoader } from "react-spinners";
import { Web3Context } from "../context/Web3Context";
import { toast } from "react-toastify";
import BlobViewer from "./BlobViewer";

const Modal = ({ setOpenModal, cidInfo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [blob, setBlob] = useState("");

  const { retrieveFile } = useContext(Web3Context);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        // console.log(cidInfo.cid, cidInfo.name);
        const blob = await retrieveFile(cidInfo.cid, cidInfo.name);

        setBlob(blob);
        setIsLoading(false);
        blob && console.log(blob.type.startsWith("application/pdf"));
      } catch (e) {
        setIsLoading(false);
        toast.error(e);
      }
    }

    getData();
  }, []);

  return (
    <div
      className="modalBackground"
      style={{
        alignItems:
          blob && blob.type.startsWith("application/pdf")
            ? "flex-start"
            : "center",
      }}
    >
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
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
            <div className="title">
              <h1>{cidInfo.name}</h1>
            </div>

            <div className="body">{blob && <BlobViewer blob={blob} />}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Modal;
