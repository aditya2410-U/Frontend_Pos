import React from "react";
import { isNil } from "lodash";
import styles from "./Cell.module.css";
import { DEFAULT_TAGS } from "../constants";
import { Switch } from "@/common/@atoms/switch";

interface Props {
  value: boolean;
  data?: unknown;
  on_toggle?: (data: unknown) => void;
  active_label?: string;
  inactive_label?: string;
  [key: string]: unknown;
}

const ToggleStatusCellRenderer: React.FC<Props> = ({
  value,
  data,
  on_toggle,
  active_label = "Active",
  inactive_label = "Inactive",
}) => {
  if (isNil(data)) return null;

  const handle_change = () => {
    if (on_toggle) {
      on_toggle(data);
    }
  };

  return React.createElement(
    DEFAULT_TAGS.DIV,
    { className: styles.toggleContainer },
    <Switch checked={value} onCheckedChange={handle_change} />,
    React.createElement(
      DEFAULT_TAGS.SPAN,
      { className: styles.agGridCustomTextCell },
      value ? active_label : inactive_label
    )
  );
};

export default ToggleStatusCellRenderer;
