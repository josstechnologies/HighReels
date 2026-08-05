import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Layout = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G stroke="currentColor" strokeWidth={1.25} clipPath="url(#a)">
      <Path d="M17 2.5H3a.5.5 0 0 0-.5.5v14a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5ZM11.875 8.125V17.5M17.5 8.125h-15" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
