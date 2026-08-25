import {ActivityIndicator, Pressable, Text, type PressableProps} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';

type ButtonProps = Omit<PressableProps, 'children' | 'disabled'> & {
  title: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const containerClass: Record<ButtonVariant, {default: string; disabled: string}> = {
  primary: {
    default: 'bg-primary active:opacity-90',
    disabled: 'bg-primary-disabled',
  },
  secondary: {
    default: 'bg-secondary active:bg-secondary-pressed',
    disabled: 'bg-secondary-disabled',
  },
  outlined: {
    default: 'border border-black bg-transparent active:opacity-80',
    disabled: 'border-0 bg-secondary-disabled',
  },
  text: {
    default: 'bg-transparent active:opacity-70',
    disabled: 'bg-transparent',
  },
};

const textClass: Record<ButtonVariant, {default: string; disabled: string}> = {
  primary: {default: 'text-white', disabled: 'text-white'},
  secondary: {default: 'text-black', disabled: 'text-white'},
  outlined: {default: 'text-black', disabled: 'text-white'},
  text: {default: 'text-black', disabled: 'text-grey-100'},
};

const spinnerColor: Record<ButtonVariant, string> = {
  primary: '#FFFFFF',
  secondary: '#111111',
  outlined: '#111111',
  text: '#111111',
};

export function Button({title, onPress, variant = 'primary', disabled = false, loading = false, className = '', ...rest}: ButtonProps) {
  const isDisabled = disabled || loading;
  // Keep default colors while loading; only use muted disabled styles when disabled.
  const state = disabled && !loading ? 'disabled' : 'default';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{disabled: isDisabled, busy: loading}}
      disabled={isDisabled}
      onPress={onPress}
      className={`h-[52px] w-full items-center justify-center rounded-[12px] ${containerClass[variant][state]} ${className}`}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={spinnerColor[variant]} />
      ) : (
        <Text className={`font-semibold text-base ${textClass[variant][state]}`}>{title}</Text>
      )}
    </Pressable>
  );
}
