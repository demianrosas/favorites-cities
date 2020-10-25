import "./citiesList.css";

import React, { useState, useCallback } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { IoIosClose, IoIosAdd } from "react-icons/io";

const CitiesList = (props) => {
  const [executingActionOnRow, setExecutingActionOnRow] = useState(-1);
  const { cities, onAddHandler, onRemoveHandler } = props;

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

  return (
    <Table striped bordered hover>
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
              <td>
                {!isExecutingMyAction && city.isFavorite && (
                  <Button
                    variant="danger"
                    onClick={() =>
                      handleActionOnRow(row, city, onRemoveHandler)
                    }
                  >
                    <IoIosClose size={24} />
                  </Button>
                )}
                {!isExecutingMyAction && !city.isFavorite && (
                  <Button
                    variant="primary"
                    onClick={() => handleActionOnRow(row, city, onAddHandler)}
                  >
                    <IoIosAdd size={24} />
                  </Button>
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
  );
};

CitiesList.defaultProps = {
  selectable: false,
  onAddHandler: () => {},
  onRemoveHandler: () => {},
};

export default CitiesList;
