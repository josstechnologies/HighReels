import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Work = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path
          stroke="#C4C4C4"
          strokeLinecap="round"
          strokeWidth={2}
          d="M16.501 19.999v-16a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16m-4-14h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-16a2 2 0 0 1-2.001-2v-10a2 2 0 0 1 2-2Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
