import Svg, {Path, SvgProps} from 'react-native-svg';

/** Reply arrow for the message selection bar. */
export const ChatReply = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props} viewBox="0 0 22 22">
    <Path
      d="M8.25 2.75L2.75 8.25L8.25 13.75M2.75 8.25H13.75C15.2087 8.25 16.6076 8.82946 17.6391 9.86091C18.6705 10.8924 19.25 12.2913 19.25 13.75C19.25 15.2087 18.6705 16.6076 17.6391 17.6391C16.6076 18.6705 15.2087 19.25 13.75 19.25H11"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
