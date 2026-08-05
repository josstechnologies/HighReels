import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Favourite = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <G
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <Path
        d="M18.098 5.64c0-2.52-1.724-3.532-4.207-3.532H8.062c-2.405 0-4.208.942-4.208 3.365V18.97a.87.87 0 0 0 1.295.759L11 16.447l5.8 3.276a.87.87 0 0 0 1.299-.758V5.641Z"
        clipRule="evenodd"
      />
      <Path d="M7.584 8.276h6.708" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
