import Svg, { SvgProps, Path } from "react-native-svg"
export const Down = (props: SvgProps) => (
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
      d="M18.25 6.375 12 12.625l-6.25-6.25"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.25 11.375 12 17.625l-6.25-6.25"
    />
  </Svg>
)
