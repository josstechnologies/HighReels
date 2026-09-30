export type MentionType = 'post' | 'comment' | 'story';

export type MentionHistoryItem = {
  id: string;
  type: MentionType;
  section: string;
  name: string;
  avatar: string;
  textBefore: string;
  mention: string;
  textAfter: string;
  time: string;
  thumbnail: string;
};

export const MENTION_HISTORY: MentionHistoryItem[] = [
  {
    id: 'olivia-beach-post',
    type: 'post',
    section: 'Today',
    name: 'Olivia Martins',
    avatar: 'https://i.pravatar.cc/100?img=5',
    textBefore: 'Hanging out with ',
    mention: '@Katty_1',
    textAfter: ' at the beach today!',
    time: '2h ago',
    thumbnail: 'https://picsum.photos/id/1011/120/120',
  },
  {
    id: 'olivia-beach-comment',
    type: 'comment',
    section: 'Today',
    name: 'Olivia Martins',
    avatar: 'https://i.pravatar.cc/100?img=5',
    textBefore: 'Hanging out with ',
    mention: '@Katty_1',
    textAfter: ' at the beach today!',
    time: '2h ago',
    thumbnail: 'https://picsum.photos/id/1015/120/120',
  },
  {
    id: 'zara-vibe-story',
    type: 'story',
    section: 'Yesterday',
    name: 'Zara Nguyen',
    avatar: 'https://i.pravatar.cc/100?img=9',
    textBefore: 'Always a vibe with ',
    mention: '@katty_1',
    textAfter: '',
    time: '2h ago',
    thumbnail: 'https://picsum.photos/id/1040/120/120',
  },
];
