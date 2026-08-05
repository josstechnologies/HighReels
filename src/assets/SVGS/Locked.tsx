import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Locked = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M18 2.25a7.875 7.875 0 0 0-7.875 7.875v4.5a4.5 4.5 0 0 0-4.5 4.5V29.25a4.5 4.5 0 0 0 4.5 4.5h15.75a4.5 4.5 0 0 0 4.5-4.5V19.125a4.5 4.5 0 0 0-4.5-4.5v-4.5A7.874 7.874 0 0 0 18 2.25Zm5.625 12.375v-4.5a5.625 5.625 0 1 0-11.25 0v4.5h11.25Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h36v36H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
