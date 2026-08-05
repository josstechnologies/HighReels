import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Repost = (props: SvgProps) => (
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
      <Path d="M2.036 12.323a1.012 1.012 0 0 1 0-.639C3.423 7.511 7.36 4.501 12 4.501c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639-1.386 4.173-5.323 7.183-9.963 7.183-4.638 0-8.574-3.007-9.964-7.178Z" />
      <Path d="M15 12.001a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
