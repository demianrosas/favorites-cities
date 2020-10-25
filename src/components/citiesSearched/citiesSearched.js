import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import CitiesList from "shared/citiesList/citiesList";
import {
  addCityToFavorites,
  removeCityFromFavorites,
} from "store/actions/cities";

const Wrapper = styled.div`
  padding: 15px;
`;

const CitiesSearched = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.cities);

  const handleAddCityToFavorite = useCallback(
    async (city) => {
      await dispatch(addCityToFavorites(city));
    },
    [dispatch]
  );

  const handleRemoveCityFromFavorite = useCallback(
    async (city) => {
      await dispatch(removeCityFromFavorites(city));
    },
    [dispatch]
  );

  return (
    <Wrapper>
      <CitiesList
        cities={cities}
        onAddHandler={handleAddCityToFavorite}
        onRemoveHandler={handleRemoveCityFromFavorite}
        selectable
      />
    </Wrapper>
  );
};

export default CitiesSearched;
