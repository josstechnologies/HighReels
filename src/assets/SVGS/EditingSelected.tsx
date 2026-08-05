import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const EditingSelected = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path
          fill="currentColor"
          d="m8.543 8.127 3.49-3.489 3.333 3.334-3.489 3.489-3.334-3.334ZM7.365 9.305.698 15.972a2.358 2.358 0 0 0 3.333 3.333l6.667-6.667-3.333-3.333Zm8.195 5.112 1.11 2.218 1.111-2.218 2.223-1.115-2.223-1.112-1.11-2.222-1.111 2.222-2.223 1.112 2.223 1.115Zm-10-9.969 1.11 2.219 1.111-2.223 2.223-1.11L7.78 2.222 6.671 0 5.56 2.223l-2.223 1.11L5.56 4.448Zm10.555-.555.972 1.94.973-1.944 1.944-.972-1.944-.973L17.087 0l-.972 1.944-1.944.973 1.944.976Z"
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
