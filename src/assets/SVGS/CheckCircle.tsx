import Svg, { SvgProps, Path, Circle } from 'react-native-svg';
export const CheckCircle = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={12} r={8.5} stroke="currentColor" strokeWidth={1.7} />
    <Path
      d="M8.5 12 11 14.5 15.5 9.5"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
