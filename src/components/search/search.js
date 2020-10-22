import React, { useState, useCallback } from "react";
import { Form, Col } from "react-bootstrap";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 25px;
`;

const Search = () => {
  const [term, setTerm] = useState("");
  const [error, setError] = useState("esto es un error");

  const inputHandler = useCallback(
    (e) => {
      setTerm(e.target.value);
    },
    [setTerm]
  );

  return (
    <Wrapper>
      <Form.Group as={Col}>
        <Form.Control
          size="lg"
          value={term}
          onChange={inputHandler}
          placeholder="Ingrese la ciudad a buscar"
        />
        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </Form.Group>
    </Wrapper>
  );
};

export default Search;
