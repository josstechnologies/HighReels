export type SearchHistoryItem = {
  id: string;
  query: string;
  time: string;
};

export type SearchHistorySection = {
  id: string;
  title: string;
  data: SearchHistoryItem[];
};

export const SEARCH_HISTORY_SECTIONS: SearchHistorySection[] = [
  {
    id: '13-february',
    title: '13 February',
    data: [
      {id: 'sam-jones-11', query: 'sam.jones11', time: '10:18 AM'},
      {id: 'sunset-summit-adventures', query: 'Sunset Summit Adventures', time: '12:45 PM'},
    ],
  },
  {
    id: '14-february',
    title: '14 February',
    data: [
      {id: 'alex-smith-22', query: 'alex.smith22', time: '9:30 AM'},
      {id: 'mountain-peak-tours', query: 'Mountain Peak Tours', time: '1:00 PM'},
    ],
  },
  {
    id: '15-february',
    title: '15 February',
    data: [
      {id: 'jane-doe-33', query: 'jane.doe33', time: '11:00 AM'},
      {id: 'river-rafting-co', query: 'River Rafting Co.', time: '3:15 PM'},
    ],
  },
  {
    id: '16-february',
    title: '16 February',
    data: [
      {id: 'mike-johnson-44', query: 'mike.johnson44', time: '2:45 PM'},
      {id: 'canyon-explorers', query: 'Canyon Explorers', time: '4:30 PM'},
    ],
  },
];
