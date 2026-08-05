import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Star = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="#C4C4C4"
        strokeLinecap="round"
        strokeWidth={2}
        d="M12.222 2.079a.53.53 0 0 0-.195.215l-2.31 4.679a2.122 2.122 0 0 1-1.596 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.122 2.122 0 0 1 .61 1.879l-.88 5.139a.53.53 0 0 0 .77.56l4.617-2.428a2.122 2.122 0 0 1 1.973 0l4.618 2.428a.53.53 0 0 0 .77-.56l-.881-5.14a2.124 2.124 0 0 1 .61-1.878l3.737-3.638a.53.53 0 0 0-.294-.904l-5.166-.756a2.123 2.123 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.755-.214Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
