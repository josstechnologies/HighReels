import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Lock = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13.75 8.751V5.626a3.75 3.75 0 1 0-7.5 0v3.125m-.625 9.375h8.75a1.875 1.875 0 0 0 1.875-1.875v-5.625a1.875 1.875 0 0 0-1.875-1.875h-8.75a1.875 1.875 0 0 0-1.875 1.875v5.625a1.875 1.875 0 0 0 1.875 1.875Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
