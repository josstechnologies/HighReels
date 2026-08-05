import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Saved = (props: SvgProps) => (
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
        d="M14.66 2.768c.918.106 1.59.897 1.59 1.82V17.5L10 14.374 3.75 17.5V4.59c0-.924.672-1.715 1.59-1.821 3.096-.36 6.224-.36 9.32 0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
