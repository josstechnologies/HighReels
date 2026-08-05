import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Replay = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        clipPath="url(#b)"
      >
        <Path d="M18.24 11.25a8.333 8.333 0 1 1-.6-4.583" />
        <Path d="M14.166 6.667h3.667a.5.5 0 0 0 .5-.5V2.5" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
