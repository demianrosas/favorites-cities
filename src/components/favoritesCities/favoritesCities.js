import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  fetchFavoritesCities,
  removeCityFromFavorites,
} from "store/actions/cities";
import CitiesList from "shared/citiesList/citiesList";

const Wrapper = styled.div`
  padding: 15px;
`;

const FavoritesCities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesCities());
  }, [dispatch]);

  const handleRemoveCityFromFavorite = useCallback(
    (city) => {
      dispatch(removeCityFromFavorites(city));
    },
    [dispatch]
  );

  const cities = useSelector((state) => state.cities.favoritesCities);

  return (
    <Wrapper>
      <CitiesList
        onRemoveHandler={handleRemoveCityFromFavorite}
        cities={cities}
      />
    </Wrapper>
  );
};

export default FavoritesCities;
