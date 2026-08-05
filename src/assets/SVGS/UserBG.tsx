import Svg, {SvgProps, Rect, Path} from 'react-native-svg';

export const UserBG = (props: SvgProps) => (
  <Svg width={58} height={58} fill="none" {...props}>
    <Rect width={58} height={58} fill="#FF5252" rx={29} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M34.644 22.809c0 4.006-2.42 7.445-5.644 7.445-3.226 0-5.643-3.439-5.643-7.447 0-4.005 2.081-6.348 5.643-6.348s5.644 2.341 5.644 6.35ZM19.095 39.21c.483.575 2.562 2.33 9.905 2.33s9.42-1.755 9.905-2.329a.52.52 0 0 0 .113-.397c-.11-1.106-1.106-6.052-10.018-6.052s-9.908 4.946-10.02 6.052a.524.524 0 0 0 .115.396Z"
      clipRule="evenodd"
    />
  </Svg>
);
