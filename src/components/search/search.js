import React, { useState, useCallback } from "react";
import { Form, Col } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { search } from "store/actions/search";

const Wrapper = styled.div`
  width: 100%;
  margin-top: 25px;
`;

const Search = () => {
  const [term, setTerm] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const searchFn = useCallback(
    debounce((termToSearch) => {
      dispatch(search(termToSearch, 0, 10));
    }, 500),
    [dispatch]
  );

  const inputHandler = useCallback(
    (e) => {
      const termToSearch = e.target.value;
      setTerm(termToSearch);
      try {
        searchFn(termToSearch);
      } catch (err) {
        setError(error);
      }
    },
    [setError, error, searchFn]
  );

  return (
    <Wrapper>
      <Form.Group as={Col}>
        <Form.Control
          size="lg"
          value={term}
          onChange={inputHandler}
          placeholder="Ingrese la ciudad a buscar"
          isInvalid={!!error}
        />
        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </Form.Group>
    </Wrapper>
  );
};

export default Search;
