import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const History = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G fill="currentColor" clipPath="url(#a)">
      <Path d="M10 0a10.022 10.022 0 0 0-7.48 3.395l-.118-1.809a.7.7 0 1 0-1.395.093l.24 3.721a.533.533 0 0 0 .013.052c.013.09.045.176.093.253a.655.655 0 0 0 .182.201c.021.016.035.04.058.052a.494.494 0 0 0 .049.017c.043.02.089.035.136.045.04.012.08.02.122.024.015 0 .03.009.046.009H5.35a.698.698 0 1 0 0-1.395h-2.08A8.594 8.594 0 1 1 1.396 10 .698.698 0 0 0 0 10 10 10 0 1 0 10 0Z" />
      <Path d="M10 4.518a.715.715 0 0 0-.715.715V10a.715.715 0 0 0 .286.572l3.814 2.86a.715.715 0 1 0 .858-1.143l-3.528-2.646v-4.41A.715.715 0 0 0 10 4.518Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
