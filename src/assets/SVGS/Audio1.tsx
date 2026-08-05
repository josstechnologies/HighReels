import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Audio1 = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="#C4C4C4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 15.625a5 5 0 0 0 5-5v-1.25m-5 6.25a5 5 0 0 1-5-5v-1.25m5 6.25v3.125m-3.125 0h6.25M10 13.125a2.5 2.5 0 0 1-2.5-2.5V3.75a2.5 2.5 0 1 1 5 0v6.875a2.5 2.5 0 0 1-2.5 2.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
