import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const DocSelected = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path
          fill="currentColor"
          d="M11.664 5.833V.383c.77.291 1.471.743 2.054 1.325l2.904 2.905a5.794 5.794 0 0 1 1.325 2.054h-5.45a.833.833 0 0 1-.833-.834Zm6.667 2.905v7.095A4.172 4.172 0 0 1 14.164 20H5.831a4.172 4.172 0 0 1-4.167-4.167V4.167A4.172 4.172 0 0 1 5.831 0h3.762c.136 0 .27.01.404.02v5.813a2.5 2.5 0 0 0 2.5 2.5h5.814c.009.134.02.269.02.405Zm-5 5.429a.834.834 0 0 0-.834-.834h-1.666v-1.666a.834.834 0 0 0-1.667 0v1.666H7.497a.833.833 0 1 0 0 1.667h1.667v1.667a.833.833 0 0 0 1.667 0V15h1.666a.833.833 0 0 0 .834-.833Z"
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
