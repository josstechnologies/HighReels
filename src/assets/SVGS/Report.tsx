import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Report = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 3.001v1.5m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.085.711l3.11-.732a48.52 48.52 0 0 0 .005 10.499l-3.114.732a9 9 0 0 1-6.086-.71l-.108-.054a9 9 0 0 0-6.208-.682L3 15.001m0-10.5v10.5m0 6v-6"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
