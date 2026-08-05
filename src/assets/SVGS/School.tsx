import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const School = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="#C4C4C4"
        strokeLinecap="round"
        strokeWidth={2}
        d="M22.5 10v6m-16-3.5V16c0 .796.633 1.56 1.758 2.122 1.125.563 2.651.879 4.242.879 1.591 0 3.117-.317 4.242-.88 1.126-.562 1.758-1.325 1.758-2.12V12.5m3.42-1.578a1 1 0 0 0-.02-1.838l-8.57-3.905a2 2 0 0 0-1.66 0L3.1 9.08a1 1 0 0 0 0 1.833l8.57 3.908a2 2 0 0 0 1.66 0l8.59-3.898Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
