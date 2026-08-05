import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Gift = (props: SvgProps) => (
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
        d="M17.5 9.375v6.875a1.25 1.25 0 0 1-1.25 1.25H4.375a1.25 1.25 0 0 1-1.25-1.25V9.375M10 4.062A2.187 2.187 0 1 0 7.812 6.25H10m0-2.188V6.25m0-2.188a2.187 2.187 0 1 1 2.188 2.188H10m0 0V17.5M2.812 9.375h15c.518 0 .938-.42.938-.938v-1.25a.938.938 0 0 0-.938-.937h-15a.938.938 0 0 0-.937.938v1.25c0 .517.42.937.938.937Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
