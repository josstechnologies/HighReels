import Svg, {SvgProps, Rect, Path} from 'react-native-svg';

export const PasswordBG = (props: SvgProps) => (
  <Svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
    <Rect width={58} height={58} rx={29} fill="#FF7A00" />
    <Path
      d="M29 17C24.58 17 21 20.58 21 25V28H20C18.9 28 18 28.9 18 30V40C18 41.1 18.9 42 20 42H38C39.1 42 40 41.1 40 40V30C40 28.9 39.1 28 38 28H37V25C37 20.58 33.42 17 29 17ZM24 25C24 22.24 26.24 20 29 20C31.76 20 34 22.24 34 25V28H24V25ZM29 33C30.1 33 31 33.9 31 35C31 36.1 30.1 37 29 37C27.9 37 27 36.1 27 35C27 33.9 27.9 33 29 33Z"
      fill="white"
    />
  </Svg>
);
