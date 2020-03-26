import React, { useState } from "react";
import "./styles.css";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

const StyledContainer = styled.div`
  margin: 10% auto;
  padding: 40px;
  border: 1px solid #61dafb;
  text-align: center;
  width: 400px;
  min-height: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 30px 0;
  }

  button {
    width: 70px;
    height: 25px;
    border-radius: 10px;
    color: black;
    background: #61dafb;
    font-size: 1.1rem;
    border: none;
    margin: 0 5px;
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #61dafb;
  background: transparent;
  color: lightblue;
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }
`;

const StyledUl = styled.ul`
  width: 290px;
  margin-top: 20px;
  padding-inline-start: 0;

  li {
    text-align: left;
    margin: 10px 0;
    font-size: 1.4rem;
    cursor: pointer;
    list-style-type: none;
  }
`;

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  // eslint-disable-next-line
  function handleBtn() {
    if (inputValue !== "") {
      setItems([
        ...items,
        {
          value: inputValue,
          isCompleted: false
        }
      ]);
      setInputValue("");
    }
  }

  const ref = React.useRef();

  React.useEffect(() => {
    ref.current.focus();

    function handleKeydown(e) {
      if (e.code === "Enter") {
        handleBtn();
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [items, inputValue, handleBtn]);

  function handleFinish(e) {
    const id = e.target.id;

    if (items[id].isCompleted) {
      items[id] = {
        ...items[id],
        isCompleted: false
      };
      setItems([...items]);
    } else {
      items[id] = {
        ...items[id],
        isCompleted: true
      };
      setItems([...items]);
    }
  }

  function handleDelete(e) {
    const id = Number(e.target.id);

    const filteredArray = items.filter((item, index) => {
      return index !== id;
    });
    setItems(filteredArray);
  }

  return (
    <StyledContainer>
      <h1>To-Do App</h1>
      <div>
        <StyledInput
          ref={ref}
          autoFocus
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={handleBtn}>Add</button>
      </div>
      <StyledUl>
        {items.map((item, id) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
              key={id}
            >
              <li
                id={id}
                onClick={handleFinish}
                style={
                  item.isCompleted
                    ? { textDecoration: "line-through" }
                    : { textDecoration: "none" }
                }
              >
                {item.value}
              </li>
              <FaTrashAlt
                style={{ cursor: "pointer" }}
                id={id}
                onClick={handleDelete}
              />
            </div>
          );
        })}
      </StyledUl>
    </StyledContainer>
  );
}
