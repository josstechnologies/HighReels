import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const AudioFilled = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M19.952 1.651a.75.75 0 0 1 .298.599v14.053a3 3 0 0 1-2.176 2.884l-1.32.377a2.554 2.554 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.555 2.555 0 0 1-3.277-2.745 2.553 2.553 0 0 1 1.875-2.164l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
