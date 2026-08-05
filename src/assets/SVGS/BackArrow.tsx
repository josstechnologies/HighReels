import Svg, { SvgProps, Path } from "react-native-svg"
export const BackArrow = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M20.252 12a.75.75 0 0 1-.648.743l-.102.007h-15a.75.75 0 0 1-.102-1.493l.102-.007h15a.75.75 0 0 1 .75.75Z"
    />
    <Path
      fill="currentColor"
      d="M11.078 17.493a.75.75 0 0 1-.974 1.136l-.084-.073-6.05-6.024a.75.75 0 0 1-.073-.979l.073-.084 6.05-6.025a.75.75 0 0 1 1.13.979l-.072.084-5.516 5.494 5.516 5.492Z"
    />
  </Svg>
)
