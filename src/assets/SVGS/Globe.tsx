import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Globe = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19.843 7.582a9.043 9.043 0 0 1 .873 6.671A9.004 9.004 0 0 1 12 21M4.157 7.582A8.958 8.958 0 0 0 3 12c0 .76.095 1.517.284 2.253A9.004 9.004 0 0 0 12 21m0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m8.716 11.253A17.918 17.918 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247M12 3a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
