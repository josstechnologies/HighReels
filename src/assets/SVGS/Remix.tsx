import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Remix = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G stroke="currentColor" strokeLinecap="round" clipPath="url(#b)">
        <Path
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M19.995 12.001c0-1.313-.049-2.615-.147-3.904a4.27 4.27 0 0 0-3.944-3.944 51.891 51.891 0 0 0-7.808 0 4.27 4.27 0 0 0-3.944 3.944c-.018.235-.034.47-.05.706m12.695 0 3.198 3.198 3.198-3.198M4.006 12.001c0 1.314.049 2.615.147 3.904a4.27 4.27 0 0 0 3.944 3.944c2.6.197 5.21.197 7.808 0a4.27 4.27 0 0 0 3.944-3.944c.018-.235.034-.47.05-.706m-19.091 0 3.198-3.198L7.203 15.2"
        />
        <Path strokeWidth={1.5} d="M12 9.68v4.641M9.76 12.001h4.48" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="currentColor" d="M0 .001h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
