import Svg, {Path, SvgProps} from 'react-native-svg';

/** Door + arrow enter — Account History “Account Logged In” / “Welcome Login” (Figma). */
export const AccountLoggedIn = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M15.8333 10H10M12.5 7.5L10 10L12.5 12.5"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.8346 5V4.16667C15.8346 3.24619 15.0885 2.5 14.168 2.5H5.83464C4.91416 2.5 4.16797 3.24619 4.16797 4.16667V15.8333C4.16797 16.7538 4.91416 17.5 5.83464 17.5H14.168C15.0885 17.5 15.8346 16.7538 15.8346 15.8333V15"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
