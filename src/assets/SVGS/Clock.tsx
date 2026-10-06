import Svg, { SvgProps, Path } from "react-native-svg"
export const Clock = (props: SvgProps) => (
    <Svg
    width={22}
    height={22}
    fill="none" {...props} viewBox="0 0 22 22">
    <Path
      d="M10.75 4.75V10.75H16.75"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.75 20.75C16.2728 20.75 20.75 16.2728 20.75 10.75C20.75 5.22715 16.2728 0.75 10.75 0.75C5.22715 0.75 0.75 5.22715 0.75 10.75C0.75 16.2728 5.22715 20.75 10.75 20.75Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
