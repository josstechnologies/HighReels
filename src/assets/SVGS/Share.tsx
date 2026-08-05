import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Share = (props: SvgProps) => (
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
        d="m14.513 7.493-5.246 5.303-5.968-3.732c-.854-.535-.677-1.834.29-2.117l14.168-4.149c.885-.26 1.706.569 1.443 1.457L15.01 18.413c-.287.968-1.579 1.141-2.109.283l-3.636-5.9"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
