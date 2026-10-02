export type ManagedDevice = {
  id: string;
  name: string;
  location: string;
  activity: string;
};

export const THIS_DEVICE: ManagedDevice & {note: string} = {
  id: 'this',
  name: 'iPhone 15 Pro',
  location: 'Sydney, NSW',
  activity: 'Active now',
  note: 'Your current logged-in device.',
};

export const OTHER_DEVICES: ManagedDevice[] = [
  {
    id: 'other-1',
    name: 'iPhone 14 Pro',
    location: 'Melbourne, VIC',
    activity: 'Active 2 hours ago',
  },
  {
    id: 'other-2',
    name: 'Samsung Galaxy S23',
    location: 'Brisbane, QLD',
    activity: 'Last active yesterday',
  },
  {
    id: 'other-3',
    name: 'MacBook Air (M2)',
    location: 'Perth, WA',
    activity: 'Last active 4 days ago',
  },
];
