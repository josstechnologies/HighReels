import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const AudioSelected = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G fill="currentColor" clipPath="url(#b)">
        <Path d="M6.875 3.75a3.125 3.125 0 0 1 6.25 0v6.875a3.125 3.125 0 1 1-6.25 0V3.75Z" />
        <Path d="M5 8.75a.625.625 0 0 1 .625.625v1.25a4.375 4.375 0 0 0 8.75 0v-1.25a.625.625 0 1 1 1.25 0v1.25a5.626 5.626 0 0 1-5 5.59v1.91h2.5a.624.624 0 1 1 0 1.25h-6.25a.625.625 0 1 1 0-1.25h2.5v-1.91a5.626 5.626 0 0 1-5-5.59v-1.25A.625.625 0 0 1 5 8.75Z" />
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
