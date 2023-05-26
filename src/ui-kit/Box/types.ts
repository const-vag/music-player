import { FlexStyle, ViewProps } from "react-native";

export type BoxProps = ViewProps & {
  /**
   * @param 'row' | 'column'
   * @default 'column'
   */
  direction?: FlexStyle["flexDirection"];
  /**
   * @name margin
   */
  m?: FlexStyle["margin"];
  /**
   * @name marginRight
   */
  mr?: FlexStyle["marginRight"];
  /**
   * @name marginLeft
   */
  ml?: FlexStyle["marginLeft"];
  /**
   * @name marginTop
   */
  mt?: FlexStyle["marginTop"];
  /**
   * @name marginBottom
   */
  mb?: FlexStyle["marginBottom"];
  /**
   * @name marginHorizontal
   */
  mh?: FlexStyle["marginHorizontal"];
  /**
   * @name marginVertical
   */
  mv?: FlexStyle["marginVertical"];
  /**
   * @name padding
   */
  p?: FlexStyle["padding"];
  /**
   * @name paddingRight
   */
  pr?: FlexStyle["paddingRight"];
  /**
   * @name paddingLeft
   */
  pl?: FlexStyle["paddingLeft"];
  /**
   * @name paddingTop
   */
  pt?: FlexStyle["paddingTop"];
  /**
   * @name paddingBottom
   */
  pb?: FlexStyle["paddingBottom"];
  /**
   * @name paddingHorizontal
   */
  ph?: FlexStyle["paddingHorizontal"];
  /**
   * @name paddingVertical
   */
  pv?: FlexStyle["paddingVertical"];
};
