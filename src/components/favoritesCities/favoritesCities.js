import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { fetchFavoritesCities } from "store/actions/cities";
import CitiesList from "shared/citiesList/citiesList";

const Wrapper = styled.div`
  padding: 15px;
`;

const FavoritesCities = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesCities());
  }, [dispatch]);

  const cities = useSelector((state) => state.cities.favoritesCities);

  return (
    <Wrapper>
      <CitiesList cities={cities} />
    </Wrapper>
  );
};

export default FavoritesCities;
