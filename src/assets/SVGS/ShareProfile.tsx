import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const ShareProfile = (props: SvgProps) => (
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
        d="M7.217 13.093A2.24 2.24 0 0 0 7.5 12a2.242 2.242 0 0 0-1.364-2.068 2.25 2.25 0 1 0 1.08 3.161Zm0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0-12.814a2.249 2.249 0 0 0 4.156-.457 2.25 2.25 0 1 0-4.156.457Zm0 12.814a2.251 2.251 0 1 0 3.935 2.186 2.251 2.251 0 0 0-3.935-2.186Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
