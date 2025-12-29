import { DefaultTags } from "../index";

interface CustomTextProps {
  children?: React.ReactNode;
  color?: string;
  className?: any;
  fontWeight?: number;
  onClick?: () => void;
  style?: any;
  id?: any;
  type?:
    | "H1"
    | "H2"
    | "H3"
    | "H6"
    | "Title"
    | "Subtitle"
    | "Body"
    | "Caption"
    | "CaptionBold"
    | "Micro"
    | "Body2"
    | "BodyLarge"
    | "MicroBold"
    | "";
}

const CustomText = ({
  children,
  style,
  color,
  type,
  className,
  onClick,
  id,
  fontWeight,
  ...rest
}: CustomTextProps) => {
  let customStyle;

  switch (type) {
    case "H1":
      customStyle = {
        fontSize: "48px",
        fontWeight: fontWeight || 700,
        fontFamily: "IBM Plex Serif",
      };
      break;
    case "H2":
      customStyle = {
        fontSize: "18px",
        fontWeight: fontWeight || 700,
        fontFamily: "IBM Plex Serif",
      };
      break;
    case "H3":
      customStyle = {
        fontSize: "16px",
        fontWeight: fontWeight || 700,
        fontFamily: "IBM Plex Serif",
      };
      break;
    case "H6":
      customStyle = {
        fontSize: "16px",
        fontWeight: fontWeight || 700,
        fontFamily: "IBM Plex Serif",
      };
      break;
    case "Title":
      customStyle = {
        fontSize: "16px",
        fontWeight: fontWeight || 300,
        fontFamily: "IBM Plex Serif",
      };
      break;
    case "Subtitle":
      customStyle = {
        fontSize: "14px",
        fontWeight: fontWeight || 700,
        fontFamily: "Switzer",
      };
      break;
    case "Body":
      customStyle = {
        fontSize: "14px",
        fontWeight: fontWeight || 300,
        fontFamily: "Switzer",
      };
      break;
    case "Body2":
      customStyle = {
        fontSize: "14px",
        fontWeight: fontWeight || 500,
        fontFamily: "Switzer",
      };
      break;
    case "Caption":
      customStyle = {
        fontSize: "12px",
        fontWeight: fontWeight || 300,
        fontFamily: "Switzer",
      };
      break;
    case "CaptionBold":
      customStyle = {
        fontSize: "12px",
        fontWeight: fontWeight || 700,
        fontFamily: "Switzer",
      };
      break;
    case "Micro":
      customStyle = {
        fontSize: "10px",
        fontWeight: fontWeight || 300,
        fontFamily: "Switzer",
      };
      break;
    case "MicroBold":
      customStyle = {
        fontSize: "10px",
        fontWeight: fontWeight || 500,
        fontFamily: "Switzer",
      };
      break;
    case "BodyLarge":
      customStyle = {
        fontSize: "24px",
        fontWeight: fontWeight || 500,
        fontFamily: "Switzer",
      };
      break;
    default:
      customStyle = {};
      break;
  }

  return (
    <DefaultTags.Paragraph
      onClick={onClick}
      className={className}
      style={{
        color: color,
        ...customStyle,
        ...style,
      }}
      id={id}
      {...rest}
    >
      {children}
    </DefaultTags.Paragraph>
  );
};

CustomText.defaultProps = {
  color: "#030303",
  children: "",
};
export default CustomText;
