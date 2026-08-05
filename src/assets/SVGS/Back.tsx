import Svg, { SvgProps, Path } from "react-native-svg"
export const Back = (props: SvgProps) => (
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
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </Svg>
)
