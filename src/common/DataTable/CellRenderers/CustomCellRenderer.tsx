import React from "react";
import TextCellRenderer from "./TextCellRenderer";
import ToggleStatusCellRenderer from "./ToggleStatusCellRenderer";
import BadgeStatusCellRenderer from "./BadgeStatusCellRenderer";

interface Props {
  type?: string;
  dtype?: string;
  value: unknown;
  value_formatted?: string;
  data?: unknown;
  col_def?: unknown;
  [key: string]: unknown;
}

const CustomCellRenderer: React.FC<Props> = ({
  type,
  dtype,
  value,
  ...rest
}) => {
  const cell_type = type || dtype;

  switch (cell_type) {
    case "toggle_status":
      return <ToggleStatusCellRenderer value={value as boolean} {...rest} />;
    case "badge_status":
      return <BadgeStatusCellRenderer value={value as boolean} {...rest} />;
    case "text":
    default:
      return <TextCellRenderer value={value} {...rest} />;
  }
};

export default CustomCellRenderer;
