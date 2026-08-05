import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Repost1 = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="currentColor"
        d="M3.501 15.116a4.573 4.573 0 0 0 4.568 4.567h9.643l-2.537 2.537a.749.749 0 1 0 1.06 1.06l3.817-3.816a.751.751 0 0 0 0-1.062l-3.817-3.817a.75.75 0 0 0-1.06 1.06l2.537 2.538H8.067a3.072 3.072 0 0 1-3.066-3.069v-3.817a.75.75 0 1 0-1.5 0v3.819ZM8.598 1.22a.75.75 0 0 0-1.06 0L3.72 5.039a.752.752 0 0 0 0 1.063l3.818 3.816a.75.75 0 0 0 1.06-1.06L6.06 6.318h9.646a3.072 3.072 0 0 1 3.067 3.07v3.817a.75.75 0 1 0 1.5 0V9.387a4.574 4.574 0 0 0-4.569-4.569H6.06l2.538-2.536a.75.75 0 0 0 0-1.062Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M2 2h20v20H2z" />
      </ClipPath>
    </Defs>
  </Svg>
)
