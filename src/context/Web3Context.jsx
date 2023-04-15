import { createContext } from "react";
import { Web3Storage } from "web3.storage";

export const Web3Context = createContext();

export const Web3ContextProvider = ({ children }) => {
  const client = new Web3Storage({ token: import.meta.env.VITE_WEB3_API });

  async function uploadFile(file) {
    const cid = await client.put(file, { name: file.name, maxRetries: 3 });
    return cid;
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

  return (
    <Web3Context.Provider value={{ uploadFile, retrieveFile }}>
      {children}
    </Web3Context.Provider>
  );
};
