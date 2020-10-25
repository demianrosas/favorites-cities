import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";

import CitiesList from "shared/citiesList/citiesList";
import {
  addCityToFavorites,
  removeCityFromFavorites,
} from "store/actions/cities";
import {
  searchByUrl,
  setIsSearching,
  searchWithLimit,
} from "store/actions/search";

const Wrapper = styled.div`
  padding: 15px;
`;

const CitiesSearched = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.cities);
  const {
    limitPerPage,
    links: { first, last, next, prev },
  } = useSelector((state) => state.search);

  const handleAddCityToFavorite = useCallback(
    async (city) => {
      await dispatch(addCityToFavorites(city));
      toast.success(`${city.name} ha sido agregada a tus ciudades favoritas`);
    },
    [dispatch]
  );

  const handleRemoveCityFromFavorite = useCallback(
    async (city) => {
      await dispatch(removeCityFromFavorites(city));
      toast.success(`${city.name} ha sido removida de tus ciudades favoritas`);
    },
    [dispatch]
  );

  const handlerSearchByUrl = useCallback(
    async (url) => {
      dispatch(setIsSearching(true));
      await dispatch(searchByUrl(url));
    },
    [dispatch]
  );

  const handlerSearchWithLimit = useCallback(
    async (limit) => {
      dispatch(setIsSearching(true));
      await dispatch(searchWithLimit(limit));
    },
    [dispatch]
  );

  const paginationProps = {
    ...(first ? { onFirst: () => handlerSearchByUrl(first) } : {}),
    ...(last ? { onLast: () => handlerSearchByUrl(last) } : {}),
    ...(next ? { onNext: () => handlerSearchByUrl(next) } : {}),
    ...(prev ? { onPrev: () => handlerSearchByUrl(prev) } : {}),
    onLimitPerPageChange: handlerSearchWithLimit,
    limitPerPage,
  };

  return (
    <Wrapper>
      <CitiesList
        cities={cities}
        onAddHandler={handleAddCityToFavorite}
        onRemoveHandler={handleRemoveCityFromFavorite}
        {...paginationProps}
        withPagination
      />
    </Wrapper>
  );
};

export default CitiesSearched;
