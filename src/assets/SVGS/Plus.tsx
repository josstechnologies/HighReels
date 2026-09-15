import Svg, { SvgProps, Path } from "react-native-svg"
export const Plus = (props: SvgProps) => (
  <Svg
  width={16}
  height={16}
  viewBox="0 0 16 16"
  fill="none"
  {...props}
>
  <Path
    d="M8 1V15"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <Path
    d="M1 8H15"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</Svg>
)
