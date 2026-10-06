import Svg, {ClipPath, Defs, G, Path, Rect, SvgProps} from 'react-native-svg';

/** Smartphone outline — Account History “Two-Factor Authentication Enabled” (Figma). */
export const Smartphone = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props} viewBox="0 0 20 20">
    <G clipPath="url(#clip0_smartphone_2fa)">
      <Path
        d="M10.0005 14.3098L10.0112 14.2979"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.62354 17.9559V2.04541C4.62354 1.68918 4.91232 1.40039 5.26855 1.40039H14.7288C15.0851 1.40039 15.3739 1.68918 15.3739 2.04541V17.9559C15.3739 18.3122 15.0851 18.6009 14.7288 18.6009H5.26855C4.91232 18.6009 4.62354 18.3122 4.62354 17.9559Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_smartphone_2fa">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
