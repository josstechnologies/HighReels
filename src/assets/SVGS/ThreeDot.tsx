import Svg, {SvgProps, Path} from 'react-native-svg';

/** Horizontal ellipsis (feed more / song menu). */
export const ThreeDot = (props: SvgProps) => (
  <Svg width={37} height={37} fill="none" {...props} viewBox="0 0 37 37">
    <Path
      stroke={props.color || '#FFFFFF'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.4108 19.4102C18.9631 19.4102 19.4108 18.9624 19.4108 18.4102C19.4108 17.8579 18.9631 17.4102 18.4108 17.4102C17.8585 17.4102 17.4108 17.8579 17.4108 18.4102C17.4108 18.9624 17.8585 19.4102 18.4108 19.4102Z"
    />
    <Path
      stroke={props.color || '#FFFFFF'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M25.4108 19.4102C25.9631 19.4102 26.4108 18.9624 26.4108 18.4102C26.4108 17.8579 25.9631 17.4102 25.4108 17.4102C24.8585 17.4102 24.4108 17.8579 24.4108 18.4102C24.4108 18.9624 24.8585 19.4102 25.4108 19.4102Z"
    />
    <Path
      stroke={props.color || '#FFFFFF'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.4108 19.4102C11.9631 19.4102 12.4108 18.9624 12.4108 18.4102C12.4108 17.8579 11.9631 17.4102 11.4108 17.4102C10.8585 17.4102 10.4108 17.8579 10.4108 18.4102C10.4108 18.9624 10.8585 19.4102 11.4108 19.4102Z"
    />
  </Svg>
);
