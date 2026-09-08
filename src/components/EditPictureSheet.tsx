import {Alert, Modal, Pressable, Text, View} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {SVGS} from '@/assets';
import {API_ROUTES} from '@/constants';
import {authActions, getActiveAccount} from '@/store';
import {API, apiErrorMessage, ApiEnvelope, readEnvelope, showToast} from '@/utils';

type ProfileMePayload = {
  id?: string;
  profile?: {avatar?: string | null};
};

type EditPictureSheetProps = {
  visible: boolean;
  hasAvatar: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseGallery: () => void;
};

export function EditPictureSheet({
  visible,
  hasAvatar,
  onClose,
  onTakePhoto,
  onChooseGallery,
}: EditPictureSheetProps) {
  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: async () => {
      const response = await API.patch<ApiEnvelope<ProfileMePayload>>(API_ROUTES.PROFILE.ME, {
        avatar: '',
      });
      const data = readEnvelope<ProfileMePayload>(response.data);
      if (!data?.id) throw new Error('UNEXPECTED_PROFILE');
      return data;
    },
    onSuccess: () => {
      const active = getActiveAccount();
      if (active) authActions.upsertAccount({...active, avatar: null});
      queryClient.invalidateQueries({queryKey: ['profile', 'me']});
      onClose();
    },
    onError: error => {
      showToast(apiErrorMessage(error, 'Something went wrong. Please try again.'));
    },
  });

  const handleRemove = () => {
    if (!hasAvatar || removeMutation.isPending) return;
    Alert.alert('Remove picture', 'Remove your current profile picture?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Remove', style: 'destructive', onPress: () => removeMutation.mutate()},
    ]);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        <Pressable className="absolute inset-0 bg-black/40" onPress={onClose} />
        <View className="rounded-t-[28px] bg-white px-5 pb-8 pt-3">
          <View className="mb-4 items-center">
            <View className="h-1 w-10 rounded-full bg-grey-75" />
          </View>

          <Pressable
            onPress={() => {
              onClose();
              onTakePhoto();
            }}
            className="flex-row items-center py-3.5 active:opacity-70">
            <SVGS.Camera width={24} height={24} color="#111111" />
            <Text className="ml-3 font-semibold text-[16px] text-black">Take a photo</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              onClose();
              onChooseGallery();
            }}
            className="flex-row items-center py-3.5 active:opacity-70">
            <SVGS.Photos width={24} height={24} />
            <Text className="ml-3 font-semibold text-[16px] text-black">Choose from gallery</Text>
          </Pressable>

          {hasAvatar ? (
            <Pressable
              onPress={handleRemove}
              disabled={removeMutation.isPending}
              className="flex-row items-center py-3.5 active:opacity-70"
              style={{opacity: removeMutation.isPending ? 0.5 : 1}}>
              <SVGS.Delete width={24} height={24} />
              <Text className="ml-3 font-semibold text-[16px] text-danger-700">Remove current picture</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}
