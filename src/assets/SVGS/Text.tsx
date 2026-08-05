import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Text = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <Path d="M19.583 6.584V4.417H4.416v2.167M12 4.417v15.167m0 0H9.835m2.167 0h2.166" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
