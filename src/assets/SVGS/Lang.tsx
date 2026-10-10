import Svg, {Path, SvgProps} from 'react-native-svg';

/** Language icon for the chat header. */
export const Lang = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props} viewBox="0 0 24 24">
    <Path
      d="M10.5 21L15.75 9.75L21 21M12 18H19.5M12.334 5.364C11.233 5.288 10.12 5.25 9 5.25C6.99425 5.24941 4.9904 5.37332 3 5.621M9 5.25V3M12.334 5.364C11.756 8.00638 10.598 10.4315 8.99988 12.4992M12.334 5.364C13.23 5.425 14.119 5.511 15 5.621M8.99988 12.4992C7.39613 14.574 5.34909 16.2889 3 17.502M8.99988 12.4992C9.43685 13.0645 9.90792 13.6045 10.411 14.116M8.99988 12.4992C8.01235 11.2214 7.199 9.81418 6.584 8.314"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
