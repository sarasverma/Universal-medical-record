import styled from "styled-components";

const Wrapper = styled.div`
  div {
    width: 100dvw;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: linear-gradient(
      54deg,
      rgba(8, 8, 122, 0.74) 0%,
      rgb(8, 148, 245) 48%,
      rgb(2, 158, 12) 100%
    );
  }

  .notFound {
    color: white;
    text-align: center;
  }

  p,
  a {
    font-size: 30px;
  }
  a {
    text-decoration: none;
    color: white;
    cursor: pointer;
    border: 1px solid black;
    padding: 1rem;
    background: white;
    color: black;
    border-radius: 10px;
  }
`;

export default Wrapper;
