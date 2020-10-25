import React from "react";
import { Jumbotron, Button, Spinner } from "react-bootstrap";

const Welcome = (props) => {
  const { isLoading, onUserReadyToStart } = props;
  return (
    <Jumbotron>
      <h1>Bienvenido!</h1>
      <h5>
        Esta app te permite buscar cuidades de todo el mundo y podes crear una
        lista de tus favoritas.
      </h5>
      <br />
      {isLoading && (
        <>
          <p>
            Estamos cargando la información necesaria para poder brindarte la
            mejor experiencia. Aguarda unos instantes por favor.
          </p>
          <Spinner animation="border" variant="secondary" />
        </>
      )}
      {!isLoading && (
        <>
          <p>Ya estamos listos!</p>
          <Button variant="primary" onClick={onUserReadyToStart}>
            Comencemos!!
          </Button>
        </>
      )}
    </Jumbotron>
  );
};

export default Welcome;
