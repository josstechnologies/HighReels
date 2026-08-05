import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Unlocked = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="currentColor"
        d="M27 2.25a7.874 7.874 0 0 1 7.875 7.875v5.625a1.125 1.125 0 1 1-2.25 0v-5.625a5.625 5.625 0 1 0-11.25 0v4.5a4.5 4.5 0 0 1 4.5 4.5V29.25a4.5 4.5 0 0 1-4.5 4.5H5.625a4.5 4.5 0 0 1-4.5-4.5V19.125a4.5 4.5 0 0 1 4.5-4.5h13.5v-4.5A7.874 7.874 0 0 1 27 2.25Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h36v36H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
