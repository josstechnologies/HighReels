import Svg, { SvgProps, Path, Circle } from 'react-native-svg';
export const Timer = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path d="M9 2h6" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
    <Circle cx={12} cy={13} r={7.5} stroke="currentColor" strokeWidth={1.7} />
    <Path
      d="M12 13 15 11"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
