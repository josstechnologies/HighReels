import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Editing = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path
          fill="#C4C4C4"
          d="M11.733 4.655.749 15.641a2.553 2.553 0 0 0 3.608 3.609L15.344 8.266l-3.611-3.611Zm1.254 3.61-2.155 2.156-1.25-1.254 2.155-2.155 1.25 1.254Zm-9.808 9.808a.906.906 0 0 1-1.25 0 .885.885 0 0 1 0-1.25l6.474-6.475 1.254 1.254-6.478 6.471Zm14.597-5.883 2.223 1.112-2.223 1.115-1.11 2.218-1.112-2.218-2.222-1.115 2.222-1.112 1.111-2.222 1.111 2.222ZM5.554 4.444l-2.222-1.11 2.222-1.111L6.665 0l1.111 2.223 2.223 1.11-2.223 1.111-1.11 2.223-1.112-2.223ZM16.11 3.89l-1.944-.972 1.944-.973L17.082 0l.972 1.944L20 2.917l-1.945.972-.972 1.944-.973-1.944Z"
        />
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
