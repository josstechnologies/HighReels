import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

export const Add = (props: SvgProps & {bgColor?: string}) => (
  <Svg fill="none" {...props} viewBox="0 0 30 30">
    <Circle cx={15} cy={15} r={15} fill={props.bgColor || '#fff'} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={props.bgColor === '#fff' ? '#000' : '#fff'}
      d="M15.004 21a1.02 1.02 0 0 1-1.02-1.02v-9.96a1.02 1.02 0 0 1 2.04 0v9.96a1.02 1.02 0 0 1-1.02 1.02Z"
    />
    <Path
      clipRule="evenodd"
      fillRule="evenodd"
      fill={props.bgColor === '#fff' ? '#000' : '#fff'}
      d="M19.989 16.019h-9.97a1.02 1.02 0 1 1 0-2.04h9.97a1.02 1.02 0 0 1 0 2.04Z"
    />
  </Svg>
);
