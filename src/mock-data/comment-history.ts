export type CommentHistoryReply = {
  id: string;
  name: string;
  avatar: string;
  text: string;
  time: string;
};

export type CommentHistoryPost = {
  id: string;
  username: string;
  avatar: string;
  caption: string;
  thumbnail: string;
  createdAt: number;
  replies: CommentHistoryReply[];
};

const KATTY_AVATAR = 'https://i.pravatar.cc/100?img=47';

const KATTY_REPLIES = (postId: string): CommentHistoryReply[] => [
  {id: `${postId}-good`, name: 'Katty Abrahams', avatar: KATTY_AVATAR, text: 'Good👍', time: '6:40 PM'},
  {id: `${postId}-thanks`, name: 'Katty Abrahams', avatar: KATTY_AVATAR, text: 'Thanks!', time: '10:00 AM'},
];

export const COMMENT_HISTORY: CommentHistoryPost[] = [
  {
    id: 'johndoe123',
    username: 'johndoe123',
    avatar: 'https://i.pravatar.cc/100?img=12',
    caption: 'new shot, new destination👀 #portrait',
    thumbnail: 'https://picsum.photos/id/1011/120/120',
    createdAt: Date.parse('2026-02-16T18:40:00Z'),
    replies: KATTY_REPLIES('johndoe123'),
  },
  {
    id: 'adam-henry',
    username: 'Adam Henry',
    avatar: 'https://i.pravatar.cc/100?img=13',
    caption: 'new shot, new destination👀 #portrait',
    thumbnail: 'https://picsum.photos/id/1027/120/120',
    createdAt: Date.parse('2026-02-15T10:00:00Z'),
    replies: KATTY_REPLIES('adam-henry'),
  },
  {
    id: 'miracle-mangel',
    username: 'Miracle Mangel',
    avatar: 'https://i.pravatar.cc/100?img=45',
    caption: 'new shot, new destination👀 #portrait',
    thumbnail: 'https://picsum.photos/id/1040/120/120',
    createdAt: Date.parse('2026-02-14T09:30:00Z'),
    replies: KATTY_REPLIES('miracle-mangel'),
  },
];
