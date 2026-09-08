import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Key = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <Path
      d="M16.4912 12.4406C14.7746 14.149 12.3162 14.674 10.1579 13.999L6.23289 17.9156C5.94955 18.2073 5.39122 18.3823 4.99122 18.324L3.17455 18.074C2.57455 17.9906 2.01622 17.424 1.92455 16.824L1.67455 15.0073C1.61622 14.6073 1.80789 14.049 2.08289 13.7656L5.99955 9.84896C5.33289 7.68229 5.84955 5.22396 7.56622 3.51563C10.0246 1.05729 14.0162 1.05729 16.4829 3.51563C18.9496 5.97396 18.9496 9.98229 16.4912 12.4406Z"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.74219 14.5781L7.65885 16.4948"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.0859 9.16406C12.7763 9.16406 13.3359 8.60442 13.3359 7.91406C13.3359 7.22371 12.7763 6.66406 12.0859 6.66406C11.3956 6.66406 10.8359 7.22371 10.8359 7.91406C10.8359 8.60442 11.3956 9.16406 12.0859 9.16406Z"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
