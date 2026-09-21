import Svg, { SvgProps, Path, Circle } from 'react-native-svg';
export const Person = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={7.5} r={3.5} stroke="currentColor" strokeWidth={1.7} />
    <Path
      d="M5.5 19a6.5 6.5 0 0 1 13 0"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
