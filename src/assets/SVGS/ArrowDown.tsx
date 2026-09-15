import Svg, { SvgProps, Path } from "react-native-svg"
export const ArrowDown = (props: SvgProps) => (
    <Svg
    width={12}
    height={7}
    viewBox="0 0 12 7"
    fill="none"
    {...props}
  >
    <Path
      d="M0.625 0.625L5.625 5.625L10.625 0.625"
      stroke="white"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
