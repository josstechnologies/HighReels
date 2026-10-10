import Svg, {Path, SvgProps} from 'react-native-svg';

/** Pencil for editing your own selected message. */
export const ChatEdit = (props: SvgProps) => (
  <Svg width={22} height={22} fill="none" {...props} viewBox="0 0 22 22">
    <Path
      d="M15.4573 4.11377L15.4568 4.11331L17.0032 2.56598C17.3256 2.24361 17.7628 2.0625 18.2188 2.0625C18.6747 2.0625 19.1119 2.24361 19.4342 2.56598C19.7566 2.88835 19.9377 3.32558 19.9377 3.78148C19.9377 4.23738 19.7566 4.67461 19.4342 4.99698L6.26267 18.1686C5.77805 18.6529 5.18042 19.0089 4.52375 19.2044L2.0625 19.9377L2.79583 17.4765C2.99134 16.8198 3.34733 16.2222 3.83167 15.7376L15.4573 4.11377ZM15.4568 4.11331H15.4578L15.4573 4.11377M15.4573 4.11377L17.875 6.53148"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
