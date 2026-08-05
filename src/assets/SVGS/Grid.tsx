import Svg, { SvgProps, Mask, Path, G } from "react-native-svg"
export const Grid = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Mask
      id="a"
      width={20}
      height={20}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Path fill="#D9D9D9" d="M.414.414h19.172v19.172H.414z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#C4C4C4"
        d="M8.124 17.873V2.163H6.61v15.71h1.514Zm5.265 0V2.163h-1.514v15.71h1.514ZM2.145 8.143h15.71V6.629H2.144v1.514Zm0 5.265h15.71v-1.514H2.144v1.514Zm-.8 4.503c0 .451.302.742.753.742H17.91c.451 0 .742-.29.742-.742V2.098c0-.451-.29-.752-.742-.752H2.098c-.451 0-.752.3-.752.752V17.91Zm1.514-1.044V3.132c0-.197.076-.273.273-.273h13.735c.207 0 .273.076.273.273v13.735c0 .207-.066.273-.273.273H3.132c-.197 0-.273-.066-.273-.273Z"
      />
    </G>
  </Svg>
)
