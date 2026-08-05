import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Clip = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path
          stroke="#8E8E8E"
          strokeLinecap="round"
          strokeWidth={1.5}
          d="m12.805 5.02-6.311 6.44a1.5 1.5 0 1 0 2.122 2.122l6.31-6.44a3 3 0 1 0-4.242-4.244L4.399 9.312a4.5 4.5 0 1 0 6.364 6.365l6.285-6.414"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M2.002 1.333h16v17h-16z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="currentColor" d="M.805.52h18v18h-18z" />
      </ClipPath>
    </Defs>
  </Svg>
)
