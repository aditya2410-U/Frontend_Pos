/**
 * Default HTML Tags constants
 * Use these instead of hardcoding tag names
 */
export const DEFAULT_TAGS = {
  DIV: "div",
  SPAN: "span",
  P: "p",
  H1: "h1",
  H2: "h2",
  H3: "h3",
  H4: "h4",
  H5: "h5",
  H6: "h6",
  HEADER: "header",
  FOOTER: "footer",
  SECTION: "section",
  ARTICLE: "article",
  NAV: "nav",
  ASIDE: "aside",
  MAIN: "main",
  BUTTON: "button",
  INPUT: "input",
  LABEL: "label",
  A: "a",
  IMG: "img",
  UL: "ul",
  OL: "ol",
  LI: "li",
  TABLE: "table",
  TR: "tr",
  TD: "td",
  TH: "th",
  THEAD: "thead",
  TBODY: "tbody",
} as const;

export type DefaultTagType = (typeof DEFAULT_TAGS)[keyof typeof DEFAULT_TAGS];
