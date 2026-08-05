import Svg, { SvgProps, Path } from "react-native-svg"
export const Up = (props: SvgProps) => (
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
      d="m5.75 17.625 6.25-6.25 6.25 6.25"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.75 12.625 12 6.375l6.25 6.25"
    />
  </Svg>
)
