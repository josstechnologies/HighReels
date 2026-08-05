import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const PencilOutline = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16.862 4.487 18.549 2.8a1.875 1.875 0 0 1 2.652 2.652L6.832 19.821a4.499 4.499 0 0 1-1.897 1.13l-2.685.8.8-2.686a4.5 4.5 0 0 1 1.13-1.897l12.683-12.68h-.001Zm0 0L19.5 7.125"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
