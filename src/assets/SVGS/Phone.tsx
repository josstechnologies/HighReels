import Svg, {Path, SvgProps} from 'react-native-svg';

export const Phone = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M7.2 3.5 9.1 7.2 7.5 8.8c.9 2.4 2.9 4.4 5.3 5.3l1.6-1.6 3.7 1.9-.5 3c-.2.8-.9 1.3-1.7 1.3C9.1 17.7 6.3 14.9 5.3 8.9c-.1-.8.5-1.5 1.3-1.7l.6-.2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
