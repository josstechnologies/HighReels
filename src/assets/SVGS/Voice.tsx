import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Voice = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      clipPath="url(#a)"
    >
      <Path d="M10 3.333v13.333M6.666 7.5v5M16.666 8.333v3.333M3.334 8.333v3.333M13.334 5.833v8.333" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
