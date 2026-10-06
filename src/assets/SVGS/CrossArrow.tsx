import Svg, { SvgProps, Path } from "react-native-svg"
export const CrossArrow = (props: SvgProps) => (
    <Svg
    width={13}
    height={13}
    fill="none" {...props} viewBox="0 0 13 13">
    <Path
      d="M0.625 11.4584L11.4583 0.625M1.05833 0.625H11.4583V11.025"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
