import Svg, { SvgProps, Path } from "react-native-svg"
export const Pencil = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M18.502 5.498a1.754 1.754 0 0 0-2.481 0l-.773.773 2.48 2.48.773-.773a1.754 1.754 0 0 0 0-2.48Zm-1.483 3.963-2.48-2.48-8.12 8.118c-.411.412-.715.92-.881 1.48l-.535 1.794a.501.501 0 0 0 .624.623l1.794-.534a3.508 3.508 0 0 0 1.48-.882l8.118-8.12Z"
    />
  </Svg>
)
