import styled from "styled-components";

export const Wrapper1 = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #988e7b;

  .notificationCard {
    display: flex;
  }
`;

export const Wrapper2 = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .notificationCard {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  button {
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
  }
`;
