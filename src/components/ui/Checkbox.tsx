import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import {SVGS} from '@/assets';
import {cn} from '@/utils';

function Checkbox({className, checked, ...props}: CheckboxPrimitive.RootProps) {
  return (
    <CheckboxPrimitive.Root
      checked={checked}
      hitSlop={8}
      className={cn(
        'h-6 w-6 items-center justify-center rounded-md border',
        checked ? 'border-primary bg-primary' : 'border-grey-75 bg-white',
        className,
      )}
      {...props}>
      <CheckboxPrimitive.Indicator className="items-center justify-center">
        <SVGS.Tick width={14} height={14} color="#FFFFFF" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export {Checkbox};
