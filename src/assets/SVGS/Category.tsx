import Svg, {SvgProps, Path} from 'react-native-svg';

export const Category = ({fill = 'none', ...props}: SvgProps) => (
  <Svg width={21} height={21} viewBox="0 0 21 20" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.75 4.25C0.75 1.62479 0.780452 0.75 4.54167 0.75C8.30288 0.75 8.33333 1.62479 8.33333 4.25C8.33333 6.87521 8.34533 7.75 4.54167 7.75C0.738004 7.75 0.75 6.87521 0.75 4.25Z"
      fill={fill}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.6719 4.25C12.6719 1.62479 12.7023 0.75 16.4635 0.75C20.2248 0.75 20.2552 1.62479 20.2552 4.25C20.2552 6.87521 20.2672 7.75 16.4635 7.75C12.6599 7.75 12.6719 6.87521 12.6719 4.25Z"
      fill={fill}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.75 15.25C0.75 12.6248 0.780452 11.75 4.54167 11.75C8.30288 11.75 8.33333 12.6248 8.33333 15.25C8.33333 17.8752 8.34533 18.75 4.54167 18.75C0.738004 18.75 0.75 17.8752 0.75 15.25Z"
      fill={fill}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.6719 15.25C12.6719 12.6248 12.7023 11.75 16.4635 11.75C20.2248 11.75 20.2552 12.6248 20.2552 15.25C20.2552 17.8752 20.2672 18.75 16.4635 18.75C12.6599 18.75 12.6719 17.8752 12.6719 15.25Z"
      fill={fill}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
