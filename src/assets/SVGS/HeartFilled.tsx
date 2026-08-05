import Svg, { SvgProps, Path } from "react-native-svg"
export const HeartFilled = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#EC2727"
      fillRule="evenodd"
      stroke="#EC2727"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.156 8.7c-.805-2.513.136-5.385 2.773-6.234a4.505 4.505 0 0 1 4.073.684c1.091-.844 2.679-1.129 4.065-.684 2.638.85 3.584 3.721 2.78 6.234-1.252 3.982-6.845 7.05-6.845 7.05S3.45 12.729 2.156 8.7Z"
      clipRule="evenodd"
    />
  </Svg>
)
