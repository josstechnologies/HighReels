import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const SmileEmoji = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
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
          d="M12.917 12.918a4.126 4.126 0 0 1-5.836 0M18.252 10a8.252 8.252 0 1 1-16.504 0 8.252 8.252 0 0 1 16.504 0ZM7.936 7.937c0 .38-.154.688-.344.688-.19 0-.344-.308-.344-.688 0-.38.154-.688.344-.688.19 0 .344.308.344.688Zm-.344 0H7.6v.014h-.007v-.014Zm5.158 0c0 .38-.154.688-.344.688-.19 0-.343-.308-.343-.688 0-.38.154-.688.343-.688.19 0 .344.308.344.688Zm-.344 0h.008v.014h-.008v-.014Z"
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
