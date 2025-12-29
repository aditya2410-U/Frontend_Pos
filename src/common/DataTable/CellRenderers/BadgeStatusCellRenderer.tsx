import React from "react";
import { isNil } from "lodash";
import styles from "./Cell.module.css";
import { DEFAULT_TAGS } from "../constants";
import { Badge } from "@/common/@atoms/badge";

interface Props {
  value: boolean;
  data?: unknown;
  active_label?: string;
  inactive_label?: string;
  active_variant?: "default" | "secondary" | "destructive" | "outline";
  inactive_variant?: "default" | "secondary" | "destructive" | "outline";
  [key: string]: unknown;
}

const BadgeStatusCellRenderer: React.FC<Props> = ({
  value,
  data,
  active_label = "Active",
  inactive_label = "Inactive",
  active_variant = "default",
  inactive_variant = "secondary",
}) => {
  if (isNil(data)) return null;

  return React.createElement(
    DEFAULT_TAGS.DIV,
    { className: styles.agGridCustomCell },
    <Badge variant={value ? active_variant : inactive_variant}>
      {value ? active_label : inactive_label}
    </Badge>
  );
};

export default BadgeStatusCellRenderer;
