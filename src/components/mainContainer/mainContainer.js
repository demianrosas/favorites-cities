import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import styled from "styled-components";

import InputSearch from "components/search/search";
import CitiesSearched from "components/citiesSearched/citiesSearched";
import FavoritesCities from "components/favoritesCities/favoritesCities";

const Wrapper = styled.div`
  padding: 15px;
`;

const MainContainer = () => {
  return (
    <Wrapper>
      <Tabs defaultActiveKey="search">
        <Tab eventKey="search" title="Ciudades">
          <InputSearch />
          <CitiesSearched />
        </Tab>
        <Tab eventKey="favorites" title="Mis Favoritas">
          <FavoritesCities />
        </Tab>
      </Tabs>
    </Wrapper>
  );
};

export default MainContainer;
