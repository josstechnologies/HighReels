import Svg, { SvgProps, Path } from "react-native-svg"
export const Posts = (props: SvgProps) => (
    <Svg
    width={19}
    height={19}
    viewBox="0 0 19 19"
    fill="none"
    {...props}
  >
    <Path
      d="M17.75 4.35V17.15C17.75 17.4814 17.4814 17.75 17.15 17.75H4.35C4.01863 17.75 3.75 17.4814 3.75 17.15V4.35C3.75 4.01863 4.01863 3.75 4.35 3.75H17.15C17.4814 3.75 17.75 4.01863 17.75 4.35Z"
      stroke="#111111"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.75 0.75H1.35C1.01863 0.75 0.75 1.01863 0.75 1.35V14.75"
      stroke="#111111"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.6587 8.2954C9.2588 8.0555 8.75 8.3435 8.75 8.8099V12.6905C8.75 13.1569 9.2588 13.4449 9.6587 13.205L12.8925 11.2647C13.2809 11.0317 13.2809 10.4687 12.8925 10.2357L9.6587 8.2954Z"
      stroke="#111111"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
