import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
export const Effects = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m8.995 14.579-.745 2.608-.745-2.608a4.125 4.125 0 0 0-2.833-2.833L2.062 11l2.61-.745a4.126 4.126 0 0 0 2.832-2.833l.746-2.61.745 2.61a4.125 4.125 0 0 0 2.833 2.832l2.61.746-2.61.745a4.126 4.126 0 0 0-2.832 2.833h0Zm7.742-6.59-.237.949-.237-.95a3.094 3.094 0 0 0-2.25-2.25l-.95-.238.95-.237a3.093 3.093 0 0 0 2.25-2.252l.237-.949.237.95a3.094 3.094 0 0 0 2.252 2.25l.948.238-.948.237a3.094 3.094 0 0 0-2.252 2.252Zm-1.25 10.864-.362 1.084-.361-1.084a2.062 2.062 0 0 0-1.305-1.304l-1.084-.361 1.084-.362a2.062 2.062 0 0 0 1.305-1.304l.361-1.085.361 1.085a2.062 2.062 0 0 0 1.305 1.304l1.084.361-1.084.362a2.062 2.062 0 0 0-1.305 1.304Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="currentColor" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
