import Svg, {SvgProps, Path} from 'react-native-svg';

export const Download = (props: SvgProps) => (
  <Svg width={18} height={25} fill="none" {...props} viewBox="0 0 18 25">
    <Path
      fill={props.color || '#616161'}
      d="M8.61325 20.9177L0 11.0749H6.15165L6.1528 0H11.0748V11.0737H17.2265L8.61325 20.9177ZM0 24.6089H17.2253V22.1485L0 22.1474V24.6089Z"
    />
  </Svg>
);
