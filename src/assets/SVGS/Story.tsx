import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Story = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13.75 17.534a8.6 8.6 0 0 0 2.407.341 8.56 8.56 0 0 0 3.778-.873 3.782 3.782 0 0 0-6.905-2.285m0 0a5.844 5.844 0 0 0-10.967 2.814v.1a11.292 11.292 0 0 0 5.843 1.619c2.06.003 4.08-.556 5.845-1.619v-.1c0-1.02-.262-1.98-.721-2.814ZM11 5.844a3.094 3.094 0 1 1-6.186 0 3.094 3.094 0 0 1 6.187 0Zm7.563 2.062a2.406 2.406 0 1 1-4.812 0 2.406 2.406 0 0 1 4.812 0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
