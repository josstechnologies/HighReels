import Svg, {SvgProps, Path} from 'react-native-svg';

/** Flame / promote icon (share sheet). */
export const Fire = (props: SvgProps) => (
  <Svg width={20} height={28} fill="none" {...props} viewBox="0 0 20 28">
    <Path
      fill={props.color || '#616161'}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.5463 10.626C17.7718 12.4369 19.0676 15.1381 19.0676 18.0238C19.0676 23.2893 14.7993 27.5576 9.5338 27.5576C4.26829 27.5576 0 23.2893 0 18.0238C0 15.907 0.690379 13.9519 1.85745 12.3702C2.12319 14.2368 2.50308 14.8696 2.68298 15.2787C3.37792 16.8595 5.5276 15.8139 4.6491 14.1783C1.29218 7.93114 5.50659 2.19168 11.9848 0C11.9848 0 9.55663 5.41071 15.5463 10.6251V10.626Z"
    />
  </Svg>
);
