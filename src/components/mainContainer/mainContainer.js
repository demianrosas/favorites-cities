import React, { useEffect, useState } from "react";
import { Tabs, Tab, Spinner, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

import "react-toastify/dist/ReactToastify.css";

import InputSearch from "components/search/search";
import CitiesSearched from "components/citiesSearched/citiesSearched";
import FavoritesCities from "components/favoritesCities/favoritesCities";
import Welcome from "components/welcome/welcome";
import Error from "components/error/error";

import { fetchFavoritesCities } from "store/actions/cities";

const Wrapper = styled.div`
  padding: 15px;
`;

const TabFavoritesTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 120px;
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
  const [isLoadingConfiguration, setIsLoadingConfiguration] = useState(false);
  const [userReadyToStart, setUserReadyToStart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoadingConfiguration(true);
    const loadInitialConfiguration = async () => {
      await dispatch(fetchFavoritesCities());
      setIsLoadingConfiguration(false);
    };

    loadInitialConfiguration();
  }, [dispatch]);

  const isSearching = useSelector((state) => state.search.isSearching);
  const favoritesCities = useSelector((state) => state.cities.favoritesCities);
  const hasError = useSelector((state) => state.ui.error);

  if (hasError) {
    return <Error />;
  }

  if (!userReadyToStart) {
    return (
      <Welcome
        isLoading={isLoadingConfiguration}
        onUserReadyToStart={() => setUserReadyToStart(true)}
      />
    );
  }

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
        <Tab
          eventKey="favorites"
          title={
            <TabFavoritesTitle>
              Mis Favoritas
              <Badge pill variant="primary">
                {Object.keys(favoritesCities).length}
              </Badge>
            </TabFavoritesTitle>
          }
        >
          <FavoritesCities />
        </Tab>
      </Tabs>

      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        className="toastify-container"
        toastClassName="toastify-toast"
      />
    </Wrapper>
  );
};

export default MainContainer;
