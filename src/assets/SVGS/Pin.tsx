import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Pin = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.2}
        d="M17.212 1.669a.74.74 0 0 1 .515.216l4.39 4.39a.74.74 0 0 1 0 1.043v.001l-6.369 6.368v4.083a.74.74 0 0 1-1.178.594l-.083-.07-3.868-3.868-7.687 7.688v.001a.74.74 0 0 1-1.046-1.047l7.687-7.69-3.865-3.864a.74.74 0 0 1 .522-1.262h4.085l6.367-6.367a.74.74 0 0 1 .53-.216Zm-6.07 7.845a.741.741 0 0 1-.377.203l-.145.014H8.02l6.25 6.251v-2.6l.014-.145a.745.745 0 0 1 .202-.38l6.062-6.063-3.343-3.343-6.061 6.063Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
