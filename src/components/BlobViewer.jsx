import React, { useState } from "react";
import PdfView from "./PdfView";

const BlobViewer = ({ blob }) => {
  const [url, setUrl] = useState(null);

  // create object URL when the component mounts
  React.useEffect(() => {
    const objectUrl = URL.createObjectURL(blob);
    setUrl(objectUrl);
    // console.log(blob, objectUrl);

    // release object URL when the component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [blob]);

  if (!url) {
    return <div>Loading...</div>;
  }

  // render an image if the blob is an image, otherwise render a video
  if (blob.type.startsWith("image/")) {
    return <img src={url} alt="blob" />;
  } else if (blob.type.startsWith("video/")) {
    return <img src={url} alt="blob" />;
  } else if (blob.type.startsWith("application/pdf")) {
    return <PdfView blob={blob} />;
  } else {
    return <div>Unsupported blob type: {blob.type}</div>;
  }
};

export default BlobViewer;
