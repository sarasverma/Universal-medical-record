import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 15px;
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    text-align: center;
  }

  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 16rem));
    gap: 2rem;
    justify-content: center;
    margin-top: 15px;
  }
  .card {
    overflow: hidden;
    box-shadow: 0 2px 20px #e1e5ee;
    border-radius: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 200ms ease-in;
  }
  .card__image {
    height: 12rem;
    width: 100%;
    object-fit: cover;
  }
  .card__title {
    padding: 1rem;
  }
  .card__description {
    padding: 0 1rem;
  }
  .card__btn {
    padding: 1rem;
    font-family: inherit;
    font-weight: bold;
    font-size: 1rem;
    margin: 1rem;
    border: 2px solid #d50000;
    background: transparent;
    color: #d50000;
    border-radius: 0.2rem;
    transition: background 200ms ease-in, color 200ms ease-in;
  }
  .card__btn.add {
    color: green;
    border-color: green;
  }

  .card:hover {
    transform: scale(1.02);
  }
  .card__btn:hover {
    background: #d50000;
    color: white;
  }
  .card__btn.add:hover {
    background: green;
  }
`;

export default Wrapper;
