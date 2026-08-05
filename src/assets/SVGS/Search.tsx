import Svg, { SvgProps, Path } from "react-native-svg"
export const Search = (props: SvgProps) => (
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
      strokeWidth={1.4}
      d="m17 17 4 4M2.998 11a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z"
    />
  </Svg>
)
