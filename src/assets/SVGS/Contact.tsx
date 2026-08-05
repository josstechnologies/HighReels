import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Contact = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#4FA531"
        fillRule="evenodd"
        d="M26.47 27.054A13.773 13.773 0 0 0 30.813 17c0-7.629-6.184-13.813-13.813-13.813C9.371 3.188 3.188 9.372 3.188 17A13.774 13.774 0 0 0 7.53 27.054 13.764 13.764 0 0 0 17 30.813c3.521.004 6.91-1.34 9.47-3.759Zm-17.765-1.82A10.604 10.604 0 0 1 17 21.25a10.605 10.605 0 0 1 8.295 3.984A11.651 11.651 0 0 1 17 28.687a11.65 11.65 0 0 1-8.295-3.453ZM22.312 12.75a5.312 5.312 0 1 1-10.624 0 5.312 5.312 0 0 1 10.624 0Z"
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
