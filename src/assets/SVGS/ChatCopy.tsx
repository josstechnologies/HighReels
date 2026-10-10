import Svg, {Path, SvgProps} from 'react-native-svg';

/** Copy for the message selection bar. */
export const ChatCopy = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props} viewBox="0 0 22 22">
    <Path
      d="M10.0833 8.25098H18.3333C19.3459 8.25098 20.1667 9.07179 20.1667 10.0843V18.3343C20.1667 19.3468 19.3459 20.1676 18.3333 20.1676H10.0833C9.07081 20.1676 8.25 19.3468 8.25 18.3343V10.0843C8.25 9.07179 9.07081 8.25098 10.0833 8.25098Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.58398 13.7507H3.66732C3.18109 13.7507 2.71477 13.5575 2.37096 13.2137C2.02714 12.8699 1.83398 12.4035 1.83398 11.9173V3.66732C1.83398 3.18109 2.02714 2.71477 2.37096 2.37096C2.71477 2.02714 3.18109 1.83398 3.66732 1.83398H11.9173C12.4035 1.83398 12.8699 2.02714 13.2137 2.37096C13.5575 2.71477 13.7507 3.18109 13.7507 3.66732V4.58398"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
