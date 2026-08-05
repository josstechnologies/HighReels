import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Following = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="m17.961 11.903-2.216-1.482m6.05-2.563-3.574 4.045m-4.617-5.06a3.093 3.093 0 1 1-6.187 0 3.093 3.093 0 0 1 6.187 0Zm-8.938 11.79v-.102a5.844 5.844 0 1 1 11.688 0v.1a11.291 11.291 0 0 1-5.845 1.619c-2.137 0-4.136-.59-5.843-1.618Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M1 1h22v22H1z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="currentColor" d="M1 1h22v22H1z" />
      </ClipPath>
    </Defs>
  </Svg>
)
