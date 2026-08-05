import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Shield = (props: SvgProps) => (
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
        d="M17.226 3.255a1.125 1.125 0 0 1 1.548 0 16.813 16.813 0 0 0 11.816 4.62 1.125 1.125 0 0 1 1.082.772 19.11 19.11 0 0 1 .953 5.978c0 8.913-6.096 16.4-14.345 18.522a1.124 1.124 0 0 1-.56 0C9.47 31.024 3.374 23.537 3.374 14.625c0-2.085.334-4.095.952-5.978a1.125 1.125 0 0 1 1.083-.774l.215.002a16.81 16.81 0 0 0 11.601-4.62Zm.774 9.12a1.125 1.125 0 0 1 1.125 1.125v5.625a1.125 1.125 0 0 1-2.25 0V13.5A1.125 1.125 0 0 1 18 12.375ZM18 22.5a1.125 1.125 0 0 0-1.125 1.125v.012c0 .62.504 1.125 1.125 1.125h.012a1.125 1.125 0 0 0 1.125-1.125v-.012a1.125 1.125 0 0 0-1.125-1.125H18Z"
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
