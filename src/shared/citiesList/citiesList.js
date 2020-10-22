import React from "react";
import { Table, Form } from "react-bootstrap";

const CitiesList = (props) => {
  const { cities, selectable, onSelectHandler, onUnselectHandler } = props;
  const handlerOnChangeCheckbox = (e, city) => {
    if (e.target.checked) {
      onSelectHandler(city);
    } else {
      onUnselectHandler(city);
    }
  };
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
            <td>
              {selectable && (
                <Form.Check
                  type="checkbox"
                  onChange={(e) => handlerOnChangeCheckbox(e, city)}
                />
              )}
            </td>
            <td>{city.country}</td>
            <td>{city.name}</td>
            <td>{city.subcountry}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

CitiesList.defaultProps = {
  selectable: false,
  onSelectHandler: () => {},
  onUnselectHandler: () => {},
};

export default CitiesList;
