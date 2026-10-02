import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type AppBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  snapPoints?: (string | number)[];
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  showDragIndicator?: boolean;
  /** Offset sheet above keyboard (`interactive` is gorhom default). */
  keyboardBehavior?: 'interactive' | 'extend' | 'fillParent';
  /** Restore sheet position when keyboard dismisses. */
  keyboardBlurBehavior?: 'none' | 'restore';
  /** Android soft-input mode; prefer `adjustPan` so interactive keyboard offset runs. */
  android_keyboardInputMode?: 'adjustPan' | 'adjustResize';
  enableBlurKeyboardOnGesture?: boolean;
  children: React.ReactNode;
};

const springConfigs = {
  damping: 28,
  stiffness: 320,
  mass: 1,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

/** Head-start so keyboard hide begins before / with the sheet dismiss. */
const KEYBOARD_DISMISS_LEAD_MS = Platform.OS === 'ios' ? 0 : 120;

export const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  (
    {
      visible,
      onClose,
      snapPoints,
      enableDynamicSizing,
      enablePanDownToClose = true,
      showDragIndicator = true,
      keyboardBehavior,
      keyboardBlurBehavior,
      android_keyboardInputMode,
      enableBlurKeyboardOnGesture,
      children,
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();
    const innerRef = useRef<BottomSheetModal>(null);
    const presentedRef = useRef(false);
    const keyboardOpenRef = useRef(false);
    const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    useImperativeHandle(ref, () => innerRef.current as BottomSheetModal);

    const animationConfigs = useBottomSheetSpringConfigs(springConfigs);

    const handleDismiss = useCallback(() => {
      presentedRef.current = false;
      keyboardOpenRef.current = false;
      setKeyboardOpen(false);
      onClose();
    }, [onClose]);

    const dismissSheet = useCallback(() => {
      if (!presentedRef.current) return;
      innerRef.current?.dismiss();
    }, []);

    /** Dismiss keyboard first (or with), then the sheet — avoids sheet vanishing under an open keyboard. */
    const dismissWithKeyboard = useCallback(() => {
      if (!presentedRef.current) return;

      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = null;
      }

      const wasKeyboardOpen = keyboardOpenRef.current;
      Keyboard.dismiss();

      if (!wasKeyboardOpen) {
        dismissSheet();
        return;
      }

      if (Platform.OS === 'ios') {
        const sub = Keyboard.addListener('keyboardWillHide', () => {
          sub.remove();
          dismissSheet();
        });
        dismissTimerRef.current = setTimeout(() => {
          sub.remove();
          dismissSheet();
        }, 300);
        return;
      }

      dismissTimerRef.current = setTimeout(dismissSheet, KEYBOARD_DISMISS_LEAD_MS);
    }, [dismissSheet]);

    useEffect(() => {
      if (visible) {
        // Best practice: defer present to next frame so BottomSheetModalProvider
        // has mounted the portal and measured dynamic content (gorhom pitfall #1).
        const id = requestAnimationFrame(() => {
          presentedRef.current = true;
          innerRef.current?.present();
        });
        return () => cancelAnimationFrame(id);
      }
      // Parent closed the sheet (Done / controlled visible=false).
      // Keyboard-aware sheets dismiss keyboard first; others close immediately.
      if (presentedRef.current) {
        if (keyboardBehavior) dismissWithKeyboard();
        else innerRef.current?.dismiss();
      }
    }, [visible, dismissWithKeyboard, keyboardBehavior]);

    useEffect(() => {
      if (!keyboardBehavior) return;
      const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
      const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
      const show = Keyboard.addListener(showEvent, () => {
        keyboardOpenRef.current = true;
        setKeyboardOpen(true);
      });
      const hide = Keyboard.addListener(hideEvent, () => {
        keyboardOpenRef.current = false;
        setKeyboardOpen(false);
      });
      return () => {
        show.remove();
        hide.remove();
      };
    }, [keyboardBehavior]);

    useEffect(
      () => () => {
        if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      },
      [],
    );

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.4}
          // `none` disables the tap gesture entirely in gorhom — use snap-to-0 (no-op while open)
          // so onPress still fires, then we dismiss keyboard before/with the sheet.
          pressBehavior={keyboardBehavior ? 0 : 'close'}
          onPress={keyboardBehavior ? dismissWithKeyboard : undefined}
        />
      ),
      [dismissWithKeyboard, keyboardBehavior],
    );

    const dynamicSizing = snapPoints ? false : (enableDynamicSizing ?? true);

    const contentStyle = useMemo(
      () => [
        styles.content,
        {
          // Drop safe-area spacer while keyboard is up — sheet already sits above it.
          paddingBottom: keyboardOpen ? 8 : Math.max(insets.bottom, 12) + 12,
        },
      ],
      [insets.bottom, keyboardOpen],
    );

    const isScrollable = !!snapPoints;

    const keyboardProps = {
      keyboardBehavior,
      keyboardBlurBehavior,
      android_keyboardInputMode,
      enableBlurKeyboardOnGesture,
    };

    if (isScrollable) {
      return (
        <BottomSheetModal
          ref={innerRef}
          snapPoints={snapPoints}
          enableDynamicSizing={dynamicSizing}
          enablePanDownToClose={enablePanDownToClose}
          enableHandlePanningGesture
          enableContentPanningGesture
          handleIndicatorStyle={showDragIndicator ? styles.handleIndicator : styles.hiddenHandle}
          handleStyle={showDragIndicator ? undefined : styles.hiddenHandle}
          backgroundStyle={styles.background}
          backdropComponent={renderBackdrop}
          animationConfigs={animationConfigs}
          onDismiss={handleDismiss}
          {...keyboardProps}>
          {children}
        </BottomSheetModal>
      );
    }

    return (
      <BottomSheetModal
        ref={innerRef}
        snapPoints={snapPoints}
        enableDynamicSizing={dynamicSizing}
        enablePanDownToClose={enablePanDownToClose}
        enableHandlePanningGesture
        enableContentPanningGesture={false}
        handleIndicatorStyle={showDragIndicator ? styles.handleIndicator : styles.hiddenHandle}
        handleStyle={showDragIndicator ? undefined : styles.hiddenHandle}
        backgroundStyle={styles.background}
        backdropComponent={renderBackdrop}
        animationConfigs={animationConfigs}
        onDismiss={handleDismiss}
        {...keyboardProps}>
        <BottomSheetView style={contentStyle}>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  },
);

AppBottomSheet.displayName = 'AppBottomSheet';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  handleIndicator: {
    backgroundColor: '#E4E4E4',
    width: 40,
    height: 4,
  },
  hiddenHandle: {
    opacity: 0,
    height: 0,
  },
});
