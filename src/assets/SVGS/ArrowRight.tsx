import Svg, { SvgProps, Path } from "react-native-svg"
export const ArrowRight = ({ strokeWidth = 1.5, ...props }: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="m8.25 19.5 7.5-7.5-7.5-7.5"
    />
  </Svg>
)
