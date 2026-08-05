import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Doc = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path
          fill="#C4C4C4"
          d="M13.33 13.333a.834.834 0 0 1-.833.834h-1.666v1.666a.834.834 0 0 1-1.667 0v-1.666H7.497a.833.833 0 1 1 0-1.667h1.667v-1.667a.833.833 0 1 1 1.667 0V12.5h1.666a.833.833 0 0 1 .834.833Zm5-4.595v7.095A4.172 4.172 0 0 1 14.165 20H5.831a4.172 4.172 0 0 1-4.167-4.167V4.167A4.172 4.172 0 0 1 5.831 0h3.762a5.798 5.798 0 0 1 4.125 1.708l2.904 2.905a5.793 5.793 0 0 1 1.709 4.125Zm-5.79-5.851a4.175 4.175 0 0 0-.876-.65v3.596a.834.834 0 0 0 .833.834h3.597a4.154 4.154 0 0 0-.65-.875L12.54 2.887Zm4.124 5.85c0-.137-.027-.269-.04-.404h-4.127a2.5 2.5 0 0 1-2.5-2.5V1.706c-.135-.013-.267-.04-.404-.04H5.831a2.5 2.5 0 0 0-2.5 2.5v11.667a2.5 2.5 0 0 0 2.5 2.5h8.333a2.5 2.5 0 0 0 2.5-2.5V8.738Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
