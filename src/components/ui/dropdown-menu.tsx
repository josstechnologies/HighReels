import * as React from 'react';
import {Platform, StyleSheet, View, type StyleProp, type ViewStyle} from 'react-native';
import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import {FullWindowOverlay as RNFullWindowOverlay} from 'react-native-screens';
import {cn} from '@/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const FullWindowOverlay = Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;

function DropdownMenuContent({
  className,
  overlayClassName,
  overlayStyle,
  portalHost,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & {
  overlayStyle?: StyleProp<ViewStyle>;
  overlayClassName?: string;
  portalHost?: string;
}) {
  return (
    <DropdownMenuPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <DropdownMenuPrimitive.Overlay
          style={Platform.select({
            web: overlayStyle ?? undefined,
            native: overlayStyle
              ? StyleSheet.flatten([StyleSheet.absoluteFill, overlayStyle as typeof StyleSheet.absoluteFill])
              : StyleSheet.absoluteFill,
          })}
          className={overlayClassName}
        />
        <DropdownMenuPrimitive.Content
          sideOffset={sideOffset}
          className={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-xl border border-white/10 bg-grey-800 p-0 shadow-lg shadow-black/20',
            className,
          )}
          {...props}
        />
      </FullWindowOverlay>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  className?: string;
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        'flex-row items-center px-4 py-3 active:bg-grey-700',
        props.disabled && 'opacity-50',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  className?: string;
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn('px-4 py-2 text-sm font-medium text-white', inset && 'pl-8', className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return <DropdownMenuPrimitive.Separator className={cn('mx-0 my-0 h-px bg-white/10', className)} {...props} />;
}

function DropdownMenuShortcut({className, ...props}: React.ComponentProps<typeof View>) {
  return <View className={cn('ml-auto', className)} {...props} />;
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuTrigger,
};
