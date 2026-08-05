import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Delete = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="#EC2727"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m14.74 9-.346 9m-4.788 0L9.26 9m6.49-3.607a48.108 48.108 0 0 1 4.5.563m-1.022-.166L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.078L4.772 5.79m0 0a43.48 43.48 0 0 0-1.022.165m1.022-.165a48.111 48.111 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.967 51.967 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.2v.917m7.5 0a48.668 48.668 0 0 0-7.5 0"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
