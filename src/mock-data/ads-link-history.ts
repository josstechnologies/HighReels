export type AdsLinkHistoryItem = {
  id: string;
  title: string;
  viewedOn: string;
  logo: string;
};

export const ADS_LINK_HISTORY: AdsLinkHistoryItem[] = [
  {
    id: 'urbanfit-summer-drop',
    title: 'UrbanFit Sneakers - Summer Drop',
    viewedOn: 'Oct 12, 2026',
    logo: 'https://ui-avatars.com/api/?name=U&background=111111&color=ffffff&size=128&font-size=0.6',
  },
  {
    id: 'glowskin-serum-launch',
    title: 'GlowSkin Serum - New Launch',
    viewedOn: 'Oct 09, 2026',
    logo: 'https://ui-avatars.com/api/?name=Glow+Skin&background=C9A97C&color=ffffff&size=128',
  },
  {
    id: 'travelx-dubai-offers',
    title: 'TravelX - Dubai Offers',
    viewedOn: 'Oct 01, 2026',
    logo: 'https://ui-avatars.com/api/?name=T&background=1FB6F5&color=ffffff&size=128&font-size=0.6',
  },
];
