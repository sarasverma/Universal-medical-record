import { createContext, useState } from "react";
import { Web3Storage } from "web3.storage";

export const Web3Context = createContext();

export const Web3ContextProvider = ({ children }) => {
  const client = new Web3Storage({ token: import.meta.env.VITE_WEB3_API });

  const [files, setFiles] = useState([]);

  async function uploadFile(file) {
    const cid = await client.put(file, { name: file.name, maxRetries: 3 });
    setFiles((prevFiles) => [...prevFiles, { name: file.name, cid }]);
  }

  async function retrieveFile(cid) {
    const url = `https://dweb.link/ipfs/${cid}`;
    // full url required to access directly
    // const url = `https://${cid}.ipfs.dweb.link/wb.jpg`;
    const response = await fetch(url);
    // console.log(url);
    const blob = await response.blob();
    return blob;
  }

  async function deleteFile(cid) {
    // await client.delete(cid);

    // remove from firestore
    setFiles((prevFiles) => prevFiles.filter((file) => file.cid !== cid));
  }

  return (
    <Web3Context.Provider
      value={{ files, uploadFile, retrieveFile, deleteFile }}
    >
      {children}
    </Web3Context.Provider>
  );
};
