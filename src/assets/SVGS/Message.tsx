import Svg, {Path, SvgProps} from 'react-native-svg';

/** Chat bubble from the profile header design. */
export const Message = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props} viewBox="0 0 24 24">
    <Path
      d="M12 19.875C16.97 19.875 21 16.181 21 11.625C21 7.069 16.97 3.375 12 3.375C7.03 3.375 3 7.069 3 11.625C3 13.729 3.859 15.648 5.273 17.105C5.705 17.552 6.013 18.145 5.859 18.746C5.69037 19.4032 5.37478 20.0135 4.936 20.531C5.28714 20.5941 5.64324 20.6255 6 20.625C7.282 20.625 8.47 20.223 9.445 19.538C10.255 19.758 11.113 19.875 12 19.875Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
