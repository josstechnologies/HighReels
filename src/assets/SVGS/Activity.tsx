import Svg, { SvgProps, Path } from "react-native-svg"
export const Activity = (props: SvgProps) => (
    <Svg
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
    {...props}
  >
    <Path
      d="M9.16667 24.3333H16.1667C22 24.3333 24.3333 22 24.3333 16.1667V9.16667C24.3333 3.33333 22 1 16.1667 1H9.16667C3.33333 1 1 3.33333 1 9.16667V16.1667C1 22 3.33333 24.3333 9.16667 24.3333Z"
      stroke="#111111"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.22266 15.5717L9.99932 11.9667C10.396 11.4534 11.131 11.3601 11.6443 11.7567L13.7793 13.4367C14.2927 13.8334 15.0277 13.7401 15.4243 13.2384L18.1193 9.76172"
      stroke="#111111"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
