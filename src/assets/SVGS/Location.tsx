import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Location = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#E37A34"
        fillRule="evenodd"
        d="m16.348 31.664.1.057.04.022a1.077 1.077 0 0 0 1.023 0l.04-.021.1-.058c.555-.329 1.095-.68 1.621-1.051a27.735 27.735 0 0 0 3.801-3.233c2.754-2.82 5.614-7.055 5.614-12.505a11.688 11.688 0 0 0-23.375 0c0 5.448 2.862 9.686 5.615 12.505a27.743 27.743 0 0 0 3.8 3.233c.526.372 1.067.722 1.621 1.05ZM17 19.125a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Z"
        clipRule="evenodd"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h34v34H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
