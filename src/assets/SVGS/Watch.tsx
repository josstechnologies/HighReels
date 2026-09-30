import Svg, { SvgProps, Path } from "react-native-svg"
export const Watch = (props: SvgProps) => (
    <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <Path
      d="M0.625 14.625V6.625C0.625 3.31129 3.31129 0.625 6.625 0.625H14.625C17.9387 0.625 20.625 3.31129 20.625 6.625V14.625C20.625 17.9387 17.9387 20.625 14.625 20.625H6.625C3.31129 20.625 0.625 17.9387 0.625 14.625Z"
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <Path
      d="M4.625 11.625V9.625C4.625 8.52043 5.52043 7.625 6.625 7.625H9.625C10.7296 7.625 11.625 8.52043 11.625 9.625V11.625C11.625 12.7296 10.7296 13.625 9.625 13.625H6.625C5.52043 13.625 4.625 12.7296 4.625 11.625Z"
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <Path
      d="M15.666 7.8457L12.5994 10.1457C12.2794 10.3857 12.2794 10.8657 12.5994 11.1057L15.666 13.4057C16.0616 13.7024 16.626 13.4201 16.626 12.9257V8.3257C16.626 7.83127 16.0616 7.54904 15.666 7.8457Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
