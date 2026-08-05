import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Heart = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M22.456 7.644c0-2.887-2.439-5.228-5.446-5.228-2.248 0-4.179 1.308-5.01 3.175-.83-1.867-2.761-3.175-5.01-3.175-3.005 0-5.445 2.34-5.445 5.228C1.545 16.03 12 21.584 12 21.584s10.456-5.553 10.456-13.94Z"
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
