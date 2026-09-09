import Svg, {Path, SvgProps} from 'react-native-svg';

export const Home = ({color = 'currentColor', fill = 'none', strokeWidth = 1.8, ...props}: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill={fill}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
    />
  </Svg>
);
