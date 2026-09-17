import * as React from 'react';
import {Platform, TextInput, type TextInputProps} from 'react-native';
import {cn} from '@/utils';

type TextareaProps = TextInputProps & {
  className?: string;
};

const Textarea = React.forwardRef<TextInput, TextareaProps>(function Textarea(
  {
    className,
    multiline = true,
    numberOfLines = Platform.select({web: 2, native: 8}),
    style,
    ...props
  },
  ref,
) {
  return (
    <TextInput
      ref={ref}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical="top"
      underlineColorAndroid="transparent"
      placeholderTextColor={props.placeholderTextColor ?? '#7F7F7F'}
      className={cn(
        'w-full text-base text-white',
        props.editable === false && 'opacity-50',
        className,
      )}
      style={[{textAlignVertical: 'top'}, style]}
      {...props}
    />
  );
});

export {Textarea};
export type {TextareaProps};
