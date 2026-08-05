import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Tools = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m13.789 19.866-1.245-4.65m0 0-2.301 2.04.521-8.68 4.792 7.257-3.012-.616Zm-6.892-.244a7.563 7.563 0 1 1 12.91-5.347M7.598 13.028a4.812 4.812 0 1 1 8.215-3.403"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
