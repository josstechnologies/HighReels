import Svg, {SvgProps, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';

export const Bookmark = (props: SvgProps) => (
  <Svg width={36} height={36} fill="none" {...props} viewBox="0 0 36 36">
    <G clipPath="url(#bookmarkClip)">
      <Path
        fill={props.color || '#FFFFFF'}
        stroke={props.color || '#FFFFFF'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M26.3895 4.98236C28.0395 5.17436 29.25 6.59786 29.25 8.25986V31.4994L18 25.8744L6.75 31.4994V8.25986C6.75 6.59786 7.959 5.17436 9.6105 4.98236C15.1848 4.33531 20.8152 4.33531 26.3895 4.98236Z"
      />
    </G>
    <Defs>
      <ClipPath id="bookmarkClip">
        <Rect width={36} height={36} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
