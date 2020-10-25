import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";

import {
  removeCityFromFavorites,
  fetchFavoritesCitiesInfo,
} from "store/actions/cities";
import CitiesList from "shared/citiesList/citiesList";

const Wrapper = styled.div`
  padding: 15px;
`;

const SpinnerWrapper = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  > span {
    margin-left: 10px;
    color: #6c757d;
  }
`;

const FavoritesCities = () => {
  const dispatch = useDispatch();
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);

  const fetchFavoritesCitiesInfoHandler = useCallback(async () => {
    setIsLoadingInfo(true);
    await dispatch(fetchFavoritesCitiesInfo());
    setIsLoadingInfo(false);
  }, [setIsLoadingInfo, dispatch]);

  useEffect(() => {
    fetchFavoritesCitiesInfoHandler();
  }, [fetchFavoritesCitiesInfoHandler]);

  const handleRemoveCityFromFavorite = useCallback(
    async (city) => {
      await dispatch(removeCityFromFavorites(city));
      toast.success(`${city.name} ha sido removida de tus ciudades favoritas`);
    },
    [dispatch]
  );

  const cities = useSelector((state) => state.cities.favoritesCities);
  const amountOfFavoritesCities = useSelector(
    (state) => state.cities.favoritesCitiesIds.length
  );

  const amountOfCitiesIncompleted =
    amountOfFavoritesCities - Object.keys(cities).length;

  if (isLoadingInfo) {
    return (
      <SpinnerWrapper>
        <Spinner animation="border" variant="secondary" />
        <span>Buscando información de tus ciudades favoritas...</span>
      </SpinnerWrapper>
    );
  }

  return (
    <Wrapper>
      <CitiesList
        onRemoveHandler={handleRemoveCityFromFavorite}
        cities={cities}
      />
      {!!amountOfCitiesIncompleted && (
        <Alert variant="danger">
          {`No pudimos obtener información de ${amountOfCitiesIncompleted} de tus ciudades favoritas. `}
          <Alert.Link onClick={fetchFavoritesCitiesInfoHandler}>
            Intente nuevamente
          </Alert.Link>
        </Alert>
      )}
    </Wrapper>
  );
};

export default FavoritesCities;
