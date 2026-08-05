import Svg, { SvgProps, Path } from "react-native-svg"
export const Close = (props: SvgProps) => (
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
      d="M6 18 18 6M6 6l12 12"
    />
  </Svg>
)
