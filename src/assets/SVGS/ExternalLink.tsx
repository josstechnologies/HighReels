import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const ExternalLink = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G fill="#8E8E8E" clipPath="url(#b)">
        <Path d="M19.058 10.658a.938.938 0 0 0-.938.937v3.774a2.752 2.752 0 0 1-2.749 2.75H4.632a2.753 2.753 0 0 1-2.75-2.75V4.63a2.752 2.752 0 0 1 2.75-2.75h3.774a.938.938 0 0 0 0-1.874H4.632A4.63 4.63 0 0 0 .008 4.63v10.74a4.63 4.63 0 0 0 4.624 4.623h10.74a4.63 4.63 0 0 0 4.623-4.624v-3.774a.938.938 0 0 0-.937-.937Z" />
        <Path d="M19.035 0h-5.828a.937.937 0 0 0-.938.92c-.01.525.433.955.96.955h3.567L9.329 9.344a.937.937 0 0 0 1.326 1.325l7.469-7.466v3.58a.938.938 0 0 0 1.875 0V.964A.962.962 0 0 0 19.035 0Z" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="currentColor" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
