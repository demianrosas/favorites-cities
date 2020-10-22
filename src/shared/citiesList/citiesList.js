import React from "react";
import { Table } from "react-bootstrap";

const CitiesList = (props) => {
  const { cities } = props;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>País</th>
          <th>Ciudad</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {cities.map((city) => (
          <tr key={city.geonameid}>
            <td></td>
            <td>{city.country}</td>
            <td>{city.name}</td>
            <td>{city.subcountry}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CitiesList;
