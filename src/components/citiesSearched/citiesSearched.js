import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import CitiesList from "shared/citiesList/citiesList";

const Wrapper = styled.div`
  padding: 15px;
`;

const CitiesSearched = () => {
  const cities = useSelector((state) => state.cities.cities);

  return (
    <Wrapper>
      <CitiesList cities={cities} />
    </Wrapper>
  );
};

export default CitiesSearched;
