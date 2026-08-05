import Svg, { SvgProps, Path } from "react-native-svg"
export const ArrowRight = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m8.25 19.5 7.5-7.5-7.5-7.5"
    />
  </Svg>
)
