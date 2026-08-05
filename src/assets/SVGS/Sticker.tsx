import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Sticker = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <G stroke="currentColor" strokeWidth={1.5} clipPath="url(#a)">
      <Path d="M13 22.94h2.981a6.957 6.957 0 0 0 6.957-6.958V13c0-4.685 0-7.027-1.455-8.483-1.456-1.455-3.799-1.455-8.484-1.455-4.685 0-7.027 0-8.483 1.455C3.061 5.973 3.061 8.315 3.061 13c0 4.686 0 7.028 1.455 8.484 1.456 1.455 3.798 1.455 8.483 1.455Z" />
      <Path d="M15.982 22.939c0-1.85 0-2.775.244-3.524a4.97 4.97 0 0 1 3.19-3.19c.749-.244 1.674-.244 3.524-.244" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h26v26H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
