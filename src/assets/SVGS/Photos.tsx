import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Photos = (props: SvgProps) => (
  <Svg
    width={34}
    height={34}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#6F41EC"
        fillRule="evenodd"
        d="M2.125 8.5a3.187 3.187 0 0 1 3.188-3.188h23.375A3.188 3.188 0 0 1 31.875 8.5v17a3.187 3.187 0 0 1-3.188 3.188H5.313A3.187 3.187 0 0 1 2.126 25.5v-17ZM4.25 22.752V25.5c0 .587.476 1.063 1.063 1.063h23.375A1.062 1.062 0 0 0 29.75 25.5v-2.748l-3.81-3.81a2.125 2.125 0 0 0-3.004 0l-1.247 1.245 1.374 1.375a1.06 1.06 0 0 1 .027 1.528 1.064 1.064 0 0 1-1.528-.027l-7.31-7.308a2.125 2.125 0 0 0-3.004 0L4.25 22.753v-.001Zm14.344-11.064a1.594 1.594 0 1 1 3.188 0 1.594 1.594 0 0 1-3.188 0Z"
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
