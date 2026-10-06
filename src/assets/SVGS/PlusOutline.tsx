import Svg, {ClipPath, Defs, G, Path, Rect, SvgProps} from 'react-native-svg';

/** 24×24 plus — Download your data header (Figma). */
export const PlusOutline = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props} viewBox="0 0 24 24">
    <G clipPath="url(#clip0_plus_outline)">
      <Path
        d="M12 4.5V19.5M19.5 12H4.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_plus_outline">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
