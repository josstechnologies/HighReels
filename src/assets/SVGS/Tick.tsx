import Svg, { SvgProps, Path } from "react-native-svg"
export const Tick = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="m5.896 21.355 8.605 6.854L30.105 7.792"
    />
  </Svg>
)
