import React, { useRef, useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Entrada inválida",
        message:
          "Por favor, introduzca valores válidos de nombre y edad (No valores vacíos).",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Edad inválida",
        message: "Por favor, introduzca una edad válida (> 0).",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);

    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Nombre del Usuario</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Edad (Años)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Agregar</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
