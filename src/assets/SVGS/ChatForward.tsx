import {SvgProps} from 'react-native-svg';
import {ChatReply} from './ChatReply';

/** Forward arrow, the reply icon flipped. */
export const ChatForward = (props: SvgProps) => <ChatReply {...props} style={[props.style, {transform: [{scaleX: -1}]}]} />;
