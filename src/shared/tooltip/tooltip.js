import React from "react";
import { OverlayTrigger, Tooltip as TooltipBS } from "react-bootstrap";

const Tooltip = (props) => {
  const { text, children } = props;

  return (
    <OverlayTrigger placement="top" overlay={<TooltipBS>{text}</TooltipBS>}>
      {children}
    </OverlayTrigger>
  );
};

export default Tooltip;
