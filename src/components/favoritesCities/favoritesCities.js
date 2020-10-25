import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";

import { removeCityFromFavorites } from "store/actions/cities";
import CitiesList from "shared/citiesList/citiesList";

const Wrapper = styled.div`
  padding: 15px;
`;

const FavoritesCities = () => {
  const dispatch = useDispatch();

  const handleRemoveCityFromFavorite = useCallback(
    async (city) => {
      await dispatch(removeCityFromFavorites(city));
      toast.success(`${city.name} ha sido removida de tus ciudades favoritas`);
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
