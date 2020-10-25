import "./citiesList.css";

import React from "react";
import { Table, Button } from "react-bootstrap";
import { IoIosClose, IoIosAdd } from "react-icons/io";

const CitiesList = (props) => {
  const { cities, onAddHandler, onRemoveHandler } = props;

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
        {Object.keys(cities).map((geonameid) => {
          const city = cities[geonameid];
          return (
            <tr key={city.geonameid}>
              <td>
                {city.isFavorite && (
                  <Button
                    variant="danger"
                    onClick={() => onRemoveHandler(city)}
                  >
                    <IoIosClose size={24} />
                  </Button>
                )}
                {!city.isFavorite && (
                  <Button variant="primary" onClick={() => onAddHandler(city)}>
                    <IoIosAdd size={24} />
                  </Button>
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
