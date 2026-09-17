import {cssInterop} from 'nativewind';
import {Svg, Path} from 'react-native-svg';
import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
import * as ProgressPrimitive from '@rn-primitives/progress';

cssInterop(Path, {className: {target: true, nativeStyleToProp: {fill: true, stroke: true}}});
cssInterop(Svg, {className: {target: 'style', nativeStyleToProp: {width: true, height: true, color: true}}});

cssInterop(DropdownMenuPrimitive.Trigger, {className: 'style'});
cssInterop(DropdownMenuPrimitive.Content, {className: 'style'});
cssInterop(DropdownMenuPrimitive.Item, {className: 'style'});
cssInterop(DropdownMenuPrimitive.Overlay, {className: 'style'});
cssInterop(DropdownMenuPrimitive.Label, {className: 'style'});
cssInterop(DropdownMenuPrimitive.Separator, {className: 'style'});

cssInterop(ProgressPrimitive.Root, {className: 'style'});
cssInterop(ProgressPrimitive.Indicator, {className: 'style'});
