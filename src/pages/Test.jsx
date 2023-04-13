import React, { useContext, useState } from "react";
import BlobViewer from "../components/BlobViewer";
import { Web3Context } from "../context/Web3Context";

const Test = () => {
  const [blob, setBlob] = useState("");
  const { files, uploadFile, retrieveFile, deleteFile } =
    useContext(Web3Context);

  async function handleFileUpload(event) {
    const files = event.target.files;
    await uploadFile(files);
  }

  async function handleFileDownload(cid) {
    const blob = await retrieveFile(cid);
    setBlob(blob);
  }

  async function handleFileDelete(cid) {
    const blob = await deleteFile(cid);
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button
        onClick={() =>
          handleFileDownload(
            "bafybeieftwbmy674c6pfgqiow3kfdb52icjt3z6v6f5sj6jk4zbcxvgf7e"
          )
        }
      >
        Download file
      </button>
      {blob && <BlobViewer blob={blob} />}
      <button
        onClick={() =>
          handleFileDelete(
            "bafybeieftwbmy674c6pfgqiow3kfdb52icjt3z6v6f5sj6jk4zbcxvgf7e"
          )
        }
      >
        Delete file
      </button>
    </div>
  );
};

export default Test;
