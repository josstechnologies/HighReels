import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const QrCode = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    viewBox="0 0 26 26"
    fill="none"
    {...props}
  >
    <Path
      d="M1 9.16667V6.25C1 3.345 3.345 1 6.25 1H9.16667"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.1699 1H19.0866C21.9916 1 24.3366 3.345 24.3366 6.25V9.16667"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M24.3398 17.332V19.082C24.3398 21.987 21.9948 24.332 19.0898 24.332H17.3398"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.16667 24.3327H6.25C3.345 24.3327 1 21.9877 1 19.0827V16.166"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.5065 9.75V15.5833C18.5065 17.9167 17.3398 19.0833 15.0065 19.0833H10.3398C8.00651 19.0833 6.83984 17.9167 6.83984 15.5833V9.75C6.83984 7.41667 8.00651 6.25 10.3398 6.25H15.0065C17.3398 6.25 18.5065 7.41667 18.5065 9.75Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.8333 12.666H4.5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
