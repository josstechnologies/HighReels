import Svg, {Path, SvgProps} from 'react-native-svg';

/** 16×16 eye — Video Removed view count (Figma). */
export const EyeOutline = ({color = '#111111', ...props}: SvgProps) => (
  <Svg width={16} height={16} fill="none" color={color} {...props} viewBox="0 0 16 16">
    <Path
      d="M1.35775 8.21467C1.31174 8.07639 1.31174 7.92694 1.35775 7.78867C2.28241 5.00667 4.90708 3 8.00041 3C11.0924 3 13.7157 5.00467 14.6424 7.78533C14.6891 7.92333 14.6891 8.07267 14.6424 8.21133C13.7184 10.9933 11.0937 13 8.00041 13C4.90841 13 2.28441 10.9953 1.35775 8.21467Z"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 8C10 8.53043 9.78929 9.03914 9.41421 9.41421C9.03914 9.78929 8.53043 10 8 10C7.46957 10 6.96086 9.78929 6.58579 9.41421C6.21071 9.03914 6 8.53043 6 8C6 7.46957 6.21071 6.96086 6.58579 6.58579C6.96086 6.21071 7.46957 6 8 6C8.53043 6 9.03914 6.21071 9.41421 6.58579C9.78929 6.96086 10 7.46957 10 8Z"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
