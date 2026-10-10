export type NoticeGroupId = 'today' | 'yesterday' | 'week' | 'month';

export type Notice =
  | {id: string; kind: 'follow'; name: string; other: string; time: 'time2h' | 'time3w'; avatar: string}
  | {id: string; kind: 'activity'; time: 'time2h'}
  | {id: string; kind: 'security'; time: 'time2h'};

export type NoticeGroup = {
  id: NoticeGroupId;
  tone: 'neutral' | 'alert';
  items: Notice[];
};

const portrait = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=200&h=200&q=80`;

export const NOTIFICATIONS: NoticeGroup[] = [
  {
    id: 'today',
    tone: 'neutral',
    items: [
      {
        id: 'today-follow',
        kind: 'follow',
        name: 'Gigi.bratzdoll',
        other: 'miss_kurdi_',
        time: 'time2h',
        avatar: portrait('photo-1494790108377-be9c29b29330'),
      },
      {id: 'today-activity', kind: 'activity', time: 'time2h'},
    ],
  },
  {
    id: 'yesterday',
    tone: 'alert',
    items: [
      {id: 'yesterday-1', kind: 'security', time: 'time2h'},
      {id: 'yesterday-2', kind: 'security', time: 'time2h'},
    ],
  },
  {
    id: 'week',
    tone: 'neutral',
    items: [
      {
        id: 'week-1',
        kind: 'follow',
        name: 'Gigi.bratzdoll',
        other: 'miss_kurdi_',
        time: 'time2h',
        avatar: portrait('photo-1544005313-94ddf0286df2'),
      },
      {
        id: 'week-2',
        kind: 'follow',
        name: 'Gigi.bratzdoll',
        other: 'miss_kurdi_',
        time: 'time2h',
        avatar: portrait('photo-1524504388940-b1c1722653e1'),
      },
      {
        id: 'week-3',
        kind: 'follow',
        name: 'Gigi.bratzdoll',
        other: 'miss_kurdi_',
        time: 'time2h',
        avatar: portrait('photo-1529626455594-4ff0802cfb7e'),
      },
    ],
  },
  {
    id: 'month',
    tone: 'neutral',
    items: [
      {
        id: 'month-1',
        kind: 'follow',
        name: 'Gigi.bratzdoll',
        other: 'miss_kurdi_',
        time: 'time3w',
        avatar: portrait('photo-1531123897727-8f129e1688ce'),
      },
      {
        id: 'month-2',
        kind: 'follow',
        name: 'Gigi.bratzdoll',
        other: 'miss_kurdi_',
        time: 'time3w',
        avatar: portrait('photo-1438761681033-6461ffad8d80'),
      },
    ],
  },
];
