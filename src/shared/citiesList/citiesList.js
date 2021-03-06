import "./citiesList.css";

import React, { useState, useCallback } from "react";
import { Table, Button, Spinner, Pagination, Form } from "react-bootstrap";
import { IoIosClose, IoIosAdd } from "react-icons/io";

import Tooltip from "shared/tooltip/tooltip";

const CitiesList = (props) => {
  const [executingActionOnRow, setExecutingActionOnRow] = useState(-1);
  const {
    cities,
    onAddHandler,
    onRemoveHandler,
    withPagination,
    onFirst,
    onLast,
    onNext,
    onPrev,
    onLimitPerPageChange,
    limitPerPage,
  } = props;

  const handleActionOnRow = useCallback(
    async (row, city, action) => {
      setExecutingActionOnRow(row);
      try {
        await action(city);
      } catch (error) {}
      setExecutingActionOnRow(-1);
    },
    [setExecutingActionOnRow]
  );

  const handlerOnLimitPerPageChange = (e) => {
    onLimitPerPageChange(e.target.value);
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="action-column"></th>
            <th>País</th>
            <th>Ciudad</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(cities).map((geonameid, row) => {
            const city = cities[geonameid];
            const isExecutingMyAction = executingActionOnRow === row;

            return (
              <tr key={city.geonameid}>
                <td className="action-column">
                  {!isExecutingMyAction && city.isFavorite && (
                    <Tooltip text="Quitar de mis favoritas">
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleActionOnRow(row, city, onRemoveHandler)
                        }
                      >
                        <IoIosClose size={24} />
                      </Button>
                    </Tooltip>
                  )}
                  {!isExecutingMyAction && !city.isFavorite && (
                    <Tooltip text="Agregar a mis favoritas">
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleActionOnRow(row, city, onAddHandler)
                        }
                      >
                        <IoIosAdd size={24} />
                      </Button>
                    </Tooltip>
                  )}
                  {isExecutingMyAction && (
                    <Spinner animation="border" variant="secondary" />
                  )}
                </td>
                <td>{city.country}</td>
                <td>{city.name}</td>
                <td>{city.subcountry}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {withPagination && !!Object.keys(cities).length && (
        <div className="pagination-wrapper">
          <Form.Control
            className="cities-list-limit-selector"
            as="select"
            onChange={handlerOnLimitPerPageChange}
            value={limitPerPage}
          >
            <option id={10}>10</option>
            <option id={25}>25</option>
            <option id={50}>50</option>
            <option id={100}>100</option>
          </Form.Control>
          <Pagination className="cities-list-pagination">
            <Tooltip text="Primera">
              <Pagination.First disabled={!onFirst} onClick={onFirst} />
            </Tooltip>
            <Tooltip text="Anterior">
              <Pagination.Prev disabled={!onPrev} onClick={onPrev} />
            </Tooltip>
            <Tooltip text="Siguiente">
              <Pagination.Next disabled={!onNext} onClick={onNext} />
            </Tooltip>
            <Tooltip text="Última">
              <Pagination.Last disabled={!onLast} onClick={onLast} />
            </Tooltip>
          </Pagination>
        </div>
      )}
    </>
  );
};

CitiesList.defaultProps = {
  withPagination: false,
  onAddHandler: () => {},
  onRemoveHandler: () => {},
};

export default CitiesList;
