import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    position: relative;
    max-width: 900px;
    width: 100%;
    border-radius: 6px;
    padding: 30px;
    margin: 0 15px;
    background-color: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  .container header {
    position: relative;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  .container header::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 3px;
    width: 27px;
    border-radius: 8px;
    background-color: #4070f4;
  }
  .container form {
    position: relative;
    margin-top: 16px;
    min-height: 490px;
  }

  .container form .details {
    margin-top: 30px;
  }

  .container form .details.ID {
    margin-top: 10px;
  }
  .container form .title {
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 500;
    margin: 6px 0;
    color: #333;
  }

  .container form .fields {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  form .fields .input-field {
    display: flex;
    width: calc(100% / 3 - 15px);
    flex-direction: column;
    margin: 4px 0;
  }

  .input-field label {
    font-size: 12px;
    font-weight: 500;
    color: #2e2e2e;
  }

  .input-field input {
    outline: none;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    border-radius: 5px;
    border: 1px solid #aaa;
    padding: 0 15px;
    height: 42px;
    margin: 8px 0;
  }

  .input-field input:is(:focus, :valid) {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.13);
  }

  .input-field input[type="date"] {
    color: #707070;
  }

  .input-field input[type="date"]:valid {
    color: #333;
  }

  .container form button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    max-width: 200px;
    width: 100%;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 5px;
    margin: 25px 0;
    background-color: #4070f4;
    transition: all 0.3s linear;
    cursor: pointer;
  }
  form button:hover {
    background-color: #265df2;
  }

  .gend {
    height: 42px;
  }
`;

export default Wrapper;
