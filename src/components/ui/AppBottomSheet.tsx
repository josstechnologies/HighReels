import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
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

export const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  (
    {
      visible,
      onClose,
      snapPoints,
      enableDynamicSizing,
      enablePanDownToClose = true,
      showDragIndicator = true,
      children,
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();
    const innerRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => innerRef.current as BottomSheetModal);

    const animationConfigs = useBottomSheetSpringConfigs(springConfigs);

    const handleDismiss = useCallback(() => {
      onClose();
    }, [onClose]);

    useEffect(() => {
      if (visible) {
        // Best practice: defer present to next frame so BottomSheetModalProvider
        // has mounted the portal and measured dynamic content (gorhom pitfall #1).
        const id = requestAnimationFrame(() => innerRef.current?.present());
        return () => cancelAnimationFrame(id);
      }
      innerRef.current?.dismiss();
    }, [visible]);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.4} pressBehavior="close" />
      ),
      [],
    );

    const dynamicSizing = snapPoints ? false : (enableDynamicSizing ?? true);

    const contentStyle = useMemo(
      () => [styles.content, { paddingBottom: Math.max(insets.bottom, 12) + 12 }],
      [insets.bottom],
    );

    const isScrollable = !!snapPoints;

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
          onDismiss={handleDismiss}>
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
        onDismiss={handleDismiss}>
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
