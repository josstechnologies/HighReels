import Svg, { SvgProps, Path } from "react-native-svg"
export const Notifications = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.546 17.415c1.898.225 3.816.225 5.714 0 1.864-.22 3.694-.66 5.454-1.31a8.968 8.968 0 0 1-2.31-6.022v-.75a6 6 0 1 0-12 0v.75a8.967 8.967 0 0 1-2.313 6.022c1.733.64 3.56 1.085 5.455 1.31Zm5.714 0a3 3 0 1 1-5.714 0M2.527 7.833a8.969 8.969 0 0 1 2.168-4.5m13.416 0a8.968 8.968 0 0 1 2.168 4.5"
    />
    <Path
      fill="#FF383C"
      d="M21.471 6.003a3.337 3.337 0 0 1-3.333 3.334 3.337 3.337 0 0 1-3.333-3.334 3.337 3.337 0 0 1 3.333-3.333 3.337 3.337 0 0 1 3.333 3.333Z"
    />
  </Svg>
)
