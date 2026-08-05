import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Ai = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={1.25}
      clipPath="url(#a)"
    >
      <Path d="M13.334 12.5c-4.062 0-5.833-1.709-5.833-5.833 0 4.124-1.759 5.833-5.834 5.833 4.075 0 5.834 1.759 5.834 5.834 0-4.075 1.77-5.834 5.833-5.834ZM18.334 5.417c-2.611 0-3.75-1.099-3.75-3.75 0 2.651-1.13 3.75-3.75 3.75 2.62 0 3.75 1.13 3.75 3.75 0-2.62 1.139-3.75 3.75-3.75Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
