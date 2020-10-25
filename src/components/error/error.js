import React from "react";
import { Jumbotron, Button } from "react-bootstrap";

const Error = () => {
  return (
    <Jumbotron>
      <h1>Oops!</h1>
      <h5>
        Lamento informarte que algo ha salido mal y no podemos proseguir. Nos
        podes ayudar a resolver este inconveniente recargando la página.
      </h5>
      <Button variant="primary" onClick={() => window.location.reload()}>
        Recargar
      </Button>
    </Jumbotron>
  );
};

export default Error;
