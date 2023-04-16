import React from "react";
import { TbError404 } from "react-icons/tb";
import Wrapper from "./styles/PageNotFound";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Wrapper>
      <div>
        <div className="notFound">
          <TbError404 style={{ fontSize: "300px" }} />
          <Link to="/">Home </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default PageNotFound;
