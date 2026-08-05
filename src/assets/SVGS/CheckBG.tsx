import Svg, {SvgProps, Rect, Path} from 'react-native-svg';

export const CheckBG = (props: SvgProps) => (
  <Svg width={80} height={80} fill="none" {...props}>
    <Rect width={80} height={80} fill="#6F41EC" rx={40} />
    <Path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m27.204 43.546 9.096 7.246 16.496-21.584" />
  </Svg>
);
