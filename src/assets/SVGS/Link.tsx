import Svg, { SvgProps, Path } from "react-native-svg"
export const Link = (props: SvgProps) => (
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
      d="M12.992 9.24a3.75 3.75 0 0 1 1.035 6.037l-3.75 3.75a3.75 3.75 0 0 1-5.304-5.304l1.465-1.464m11.125-.518 1.464-1.464a3.75 3.75 0 0 0-5.304-5.304l-3.75 3.75a3.75 3.75 0 0 0 1.035 6.037"
    />
  </Svg>
)
