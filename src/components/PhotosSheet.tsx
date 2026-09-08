import {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library/legacy';
import {SVGS} from '@/assets';

const COLS = 3;
const GAP = 2;
const TILE = (Dimensions.get('window').width - GAP * (COLS - 1)) / COLS;

type PhotosSheetProps = {
  visible: boolean;
  onClose: () => void;
  onOpenCamera: () => void;
  onSelectUri: (uri: string) => void;
};

type GridItem =
  | {kind: 'camera'; id: 'camera'}
  | {kind: 'asset'; id: string; uri: string};

export function PhotosSheet({visible, onClose, onOpenCamera, onSelectUri}: PhotosSheetProps) {
  const [permission, requestPermission] = MediaLibrary.usePermissions({
    granularPermissions: ['photo'],
  });
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [endCursor, setEndCursor] = useState<string | undefined>();
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedUri, setSelectedUri] = useState<string | null>(null);
  const pickRequest = useRef(0);

  const loadPage = useCallback(
    async (after?: string) => {
      if (loading) return;
      setLoading(true);
      try {
        const page = await MediaLibrary.getAssetsAsync({
          first: 60,
          after,
          mediaType: MediaLibrary.MediaType.photo,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        });
        setAssets(prev => (after ? [...prev, ...page.assets] : page.assets));
        setEndCursor(page.endCursor);
        setHasNext(page.hasNextPage);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  useEffect(() => {
    if (!visible) return;
    setSelectedId(null);
    setSelectedUri(null);
    pickRequest.current += 1;
    setAssets([]);
    setEndCursor(undefined);
    setHasNext(true);

    (async () => {
      let status = permission;
      if (!status?.granted) {
        status = await requestPermission();
      }
      if (status?.granted) {
        await loadPage();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const data: GridItem[] = [
    {kind: 'camera', id: 'camera'},
    ...assets.map(a => ({kind: 'asset' as const, id: a.id, uri: a.uri})),
  ];

  const handleAssetPress = async (asset: MediaLibrary.Asset) => {
    const request = ++pickRequest.current;
    // Single selection only — replace any previous check immediately.
    setSelectedId(asset.id);
    setSelectedUri(asset.uri || null);

    try {
      const info = await MediaLibrary.getAssetInfoAsync(asset.id);
      if (request !== pickRequest.current) return;
      const uri = info.localUri || info.uri || asset.uri;
      if (uri) setSelectedUri(uri);
    } catch {
      // Keep the thumbnail uri. Some library photos reject getAssetInfoAsync (limited access / iCloud).
      if (request !== pickRequest.current) return;
      if (!asset.uri) {
        setSelectedId(null);
        setSelectedUri(null);
      }
    }
  };

  const handleDone = () => {
    if (!selectedUri) return;
    onClose();
    onSelectUri(selectedUri);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end">
        <Pressable className="absolute inset-0 bg-black/50" onPress={onClose} />
        <View className="h-[72%] rounded-t-[28px] bg-white pt-3">
          <View className="mb-3 items-center">
            <View className="h-1 w-10 rounded-full bg-grey-75" />
          </View>

          <View className="mb-3 flex-row items-center justify-between px-5">
            <Text className="font-extrabold text-[22px] text-black">Photos</Text>
            <Pressable
              onPress={handleDone}
              disabled={!selectedUri}
              style={{opacity: selectedUri ? 1 : 0.35}}
              className="active:opacity-70">
              <Text className="font-semibold text-[15px] text-primary">Done</Text>
            </Pressable>
          </View>

          {!permission?.granted ? (
            <View className="flex-1 items-center justify-center px-8">
              <Text className="text-center font-medium text-[15px] text-grey-300">
                Allow photo access to choose a profile picture.
              </Text>
              <Pressable onPress={() => requestPermission()} className="mt-4 active:opacity-70">
                <Text className="font-semibold text-[15px] text-primary">Grant permission</Text>
              </Pressable>
            </View>
          ) : (
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              numColumns={COLS}
              onEndReached={() => {
                if (hasNext && endCursor && !loading) loadPage(endCursor);
              }}
              onEndReachedThreshold={0.4}
              ListFooterComponent={
                loading ? (
                  <View className="py-4">
                    <ActivityIndicator color="#6F41EC" />
                  </View>
                ) : null
              }
              renderItem={({item, index}) => {
                const marginRight = (index + 1) % COLS === 0 ? 0 : GAP;
                if (item.kind === 'camera') {
                  return (
                    <Pressable
                      onPress={() => {
                        onClose();
                        onOpenCamera();
                      }}
                      style={{width: TILE, height: TILE, marginRight, marginBottom: GAP}}
                      className="items-center justify-center bg-grey-500 active:opacity-80">
                      <SVGS.Camera width={28} height={28} color="#FFFFFF" />
                    </Pressable>
                  );
                }
                const selected = selectedId === item.id;
                return (
                  <Pressable
                    onPress={() => {
                      const asset = assets.find(a => a.id === item.id);
                      if (asset) handleAssetPress(asset);
                    }}
                    style={{width: TILE, height: TILE, marginRight, marginBottom: GAP}}
                    className="overflow-hidden bg-grey-50">
                    <Image source={{uri: item.uri}} style={{width: TILE, height: TILE}} />
                    {selected ? (
                      <View className="absolute right-1.5 top-1.5 h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <SVGS.Tick width={14} height={14} color="#FFFFFF" />
                      </View>
                    ) : null}
                  </Pressable>
                );
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}
