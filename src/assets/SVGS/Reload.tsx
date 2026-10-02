import Svg, {ClipPath, Defs, G, Path, Rect, SvgProps} from 'react-native-svg';

/** 20×20 restore/reload — Recently Deleted row (Figma). */
export const Reload = ({color = '#111111', ...props}: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" color={color} {...props}>
    <G clipPath="url(#clip0_reload)">
      <Path
        d="M14.9035 16.17C11.9598 18.9581 7.34107 19.2505 4.04915 16.6785C0.422434 13.845 -0.220601 8.60801 2.6129 4.9813C5.44641 1.35459 10.6834 0.711537 14.3102 3.545C15.7273 4.65218 16.6889 6.12636 17.1655 7.72804"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.4521 6.88086L16.9939 7.82986C17.2606 7.90134 17.5348 7.74307 17.6062 7.47631L18.5553 3.93458"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_reload">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
