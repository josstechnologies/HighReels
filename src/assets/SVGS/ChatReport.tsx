import Svg, {Path, SvgProps} from 'react-native-svg';

/** Outline flag for the chat info sheet. */
export const ChatReport = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props} viewBox="0 0 24 24">
    <Path
      d="M3 3.00098V4.50098M3 4.50098L5.77 3.80798C7.8544 3.28702 10.0564 3.52893 11.978 4.48998L12.086 4.54398C13.9688 5.48528 16.1219 5.73687 18.171 5.25498L21.281 4.52298C20.9029 8.01252 20.9046 11.5328 21.286 15.022L18.172 15.754C16.1227 16.2364 13.9692 15.9852 12.086 15.044L11.978 14.99C10.0564 14.0289 7.8544 13.787 5.77 14.308L3 15.001M3 4.50098V15.001M3 21.001V15.001"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
