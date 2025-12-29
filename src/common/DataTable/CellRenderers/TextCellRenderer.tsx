import React from "react";
import { isEmpty, isArray, isObject, head, get, toString, trim } from "lodash";
import styles from "./Cell.module.css";
import { DEFAULT_TAGS } from "../constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/common/@atoms/tooltip";

interface Props {
  value: unknown;
  value_formatted?: string;
  is_link?: boolean;
  on_click?: () => void;
  [key: string]: unknown;
}

const TextCellRenderer: React.FC<Props> = ({
  value,
  value_formatted,
  is_link,
  on_click,
}) => {
  let display_value = value_formatted;

  if (isEmpty(display_value)) {
    if (isArray(value)) {
      display_value = head(value as unknown[])?.toString() || "";
    } else if (isObject(value)) {
      display_value = get(value, "label", "");
    } else {
      display_value = toString(value);
    }
  }

  if (isEmpty(display_value) || trim(display_value) === "") {
    return React.createElement(
      DEFAULT_TAGS.DIV,
      { className: styles.agGridCustomCell },
      React.createElement(
        DEFAULT_TAGS.SPAN,
        { className: styles.emptyCell },
        "--"
      )
    );
  }

  const content = React.createElement(
    DEFAULT_TAGS.SPAN,
    {
      className: is_link
        ? styles.agGridCustomCellHyperLink
        : styles.agGridCustomTextCell,
      onClick: is_link ? on_click : undefined,
      style: { cursor: is_link ? "pointer" : "default" },
    },
    display_value
  );

  return React.createElement(
    DEFAULT_TAGS.DIV,
    { className: styles.agGridCustomCell },
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent>
          {React.createElement(DEFAULT_TAGS.P, null, display_value)}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TextCellRenderer;
