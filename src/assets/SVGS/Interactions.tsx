import Svg, { SvgProps, G, Path, Rect, Defs, ClipPath } from "react-native-svg"
export const Interactions = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="m7 3.708-2 .426A6.13 6.13 0 0 0 .286 11.41l1.028 4.815.074.307a6.13 6.13 0 0 0 6.89 4.467l.31-.058 3.136-.67.307-.073a6.097 6.097 0 0 0 2.059-.991l-1.876-.506a4.796 4.796 0 0 1-.775.235l-3.135.67a4.765 4.765 0 0 1-5.654-3.666L1.62 11.124A4.765 4.765 0 0 1 5.286 5.47l1.315-.28.4-1.482Z"
        clipRule="evenodd"
      />
      <Rect
        width={13.966}
        height={15.684}
        x={8.589}
        y={0.701}
        stroke="currentColor"
        strokeWidth={1.5}
        rx={5.983}
        transform="rotate(15.09 8.59 .7)"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
