import Svg, {SvgProps, G, Path, Defs, ClipPath} from 'react-native-svg';
export const Ads = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.577 3.781a21.86 21.86 0 0 1-8.099 2.324c-.63.055-1.27.082-1.915.082h-.688a4.125 4.125 0 0 0 0 8.25h.688c.645 0 1.285.028 1.915.083m0 0c.232.882.536 1.734.903 2.551.227.504.055 1.11-.424 1.385l-.602.349c-.505.291-1.155.107-1.4-.423a19.107 19.107 0 0 1-1.32-3.925m2.843.063a16.527 16.527 0 0 1-.54-4.207c0-1.454.187-2.864.54-4.208m0 8.415a21.861 21.861 0 0 1 8.1 2.324m0-13.063c.498 1.608.81 3.267.929 4.946a22.323 22.323 0 0 1 0 3.171 21.918 21.918 0 0 1-1.278 5.977m.348-14.094c-.107-.346-.224-.69-.348-1.031m1.278 5.977a2.061 2.061 0 0 1 0 3.171"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
