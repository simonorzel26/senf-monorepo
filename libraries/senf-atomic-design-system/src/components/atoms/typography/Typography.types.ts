/** @format */

export interface TypographyProps {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
  textAlign?: string;
  paddingInline: string;
  lineHeight?: string;
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "buttonBg"
    | "buttonSm"
    | "bodyBg"
    | "bodySm"
    | "footnote";
}
