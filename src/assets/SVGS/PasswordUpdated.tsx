import Svg, {Path, SvgProps} from 'react-native-svg';

/** Password field + dots + check — Account History “Password Updated” (Figma). */
export const PasswordUpdated = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props} viewBox="0 0 20 20">
    <Path
      d="M18.8966 10.7945V5.85201C18.8966 4.76014 18.0115 3.875 16.9195 3.875H3.08047C1.98859 3.875 1.10345 4.76014 1.10345 5.85201V11.783C1.10345 12.8749 1.98859 13.7601 3.08047 13.7601H10"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.4697 16.2309L14.4467 18.2079L18.4008 14.2539"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 9.17527L10.0083 9.16602"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.332 9.17527L13.3404 9.16602"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.66797 9.17527L6.6763 9.16602"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
