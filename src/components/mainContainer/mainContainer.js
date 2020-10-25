import React from "react";
import { Tabs, Tab, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";

import InputSearch from "components/search/search";
import CitiesSearched from "components/citiesSearched/citiesSearched";
import FavoritesCities from "components/favoritesCities/favoritesCities";

const Wrapper = styled.div`
  padding: 15px;
`;

const SpinnerWrapper = styled.div`
  padding-left: 15px;
  display: flex;
  align-items: center;
  > span {
    margin-left: 10px;
    color: #6c757d;
  }
`;

const MainContainer = () => {
  const isSearching = useSelector((state) => state.search.isSearching);

  return (
    <Wrapper>
      <Tabs defaultActiveKey="search">
        <Tab eventKey="search" title="Ciudades">
          <InputSearch />
          {isSearching && (
            <SpinnerWrapper>
              <Spinner animation="border" variant="secondary" />
              <span>Buscando...</span>
            </SpinnerWrapper>
          )}
          {!isSearching && <CitiesSearched />}
        </Tab>
        <Tab eventKey="favorites" title="Mis Favoritas">
          <FavoritesCities />
        </Tab>
      </Tabs>
    </Wrapper>
  );
};

export default MainContainer;
