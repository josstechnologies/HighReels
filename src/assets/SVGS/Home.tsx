import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Home = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="#C4C4C4"
        strokeLinecap="round"
        strokeWidth={2}
        d="M15.5 20.999v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8m-6-11a2 2 0 0 1 .709-1.527l7-6a2 2 0 0 1 2.582 0l7 6a2 2 0 0 1 .709 1.527v9a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2v-9Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
