import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Document = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
    fill="none"
    {...props}
  >
    <G fill="#028CF3" clipPath="url(#a)">
      <Path d="M8.794 3.486A2.413 2.413 0 0 0 6.381 5.9V28.1a2.414 2.414 0 0 0 2.413 2.414h16.41a2.414 2.414 0 0 0 2.413-2.414V17.966a4.827 4.827 0 0 0-4.826-4.827h-2.413a2.414 2.414 0 0 1-2.414-2.413V8.313a4.827 4.827 0 0 0-4.826-4.827H8.794Z" />
      <Path d="M18.375 2.573a7.409 7.409 0 0 1 1.812 4.865v2.656c0 .294.238.532.531.532h2.656a7.41 7.41 0 0 1 4.865 1.812 13.839 13.839 0 0 0-9.864-9.865Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h34v34H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
