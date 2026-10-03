export type ScreenTimeMode = 'same' | 'custom';

export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type DurationMinutes = number;

export type ScreenTimeState = {
  mode: ScreenTimeMode;
  sameLimitMinutes: DurationMinutes;
  dayLimits: Record<Weekday, DurationMinutes>;
};

export const WEEKDAYS: {id: Weekday; label: string}[] = [
  {id: 'monday', label: 'Monday'},
  {id: 'tuesday', label: 'Tuesday'},
  {id: 'wednesday', label: 'Wednesday'},
  {id: 'thursday', label: 'Thursday'},
  {id: 'friday', label: 'Friday'},
  {id: 'saturday', label: 'Saturday'},
  {id: 'sunday', label: 'Sunday'},
];

export const PRESET_LIMITS: {id: string; label: string; minutes: DurationMinutes | 'custom'}[] = [
  {id: '30m', label: '30m', minutes: 30},
  {id: '1h', label: '1 Hour', minutes: 60},
  {id: '1h30', label: '1 Hour 30 Minutes', minutes: 90},
  {id: '2h', label: '2 Hour', minutes: 120},
  {id: '4h', label: '4 Hour', minutes: 240},
  {id: 'custom', label: 'Custom', minutes: 'custom'},
];

const DEFAULT_DAY_LIMITS: Record<Weekday, DurationMinutes> = {
  monday: 60,
  tuesday: 60,
  wednesday: 45,
  thursday: 60,
  friday: 60,
  saturday: 30,
  sunday: 75,
};

/** ponytail: in-memory mock store until API / final nav placement */
let state: ScreenTimeState = {
  mode: 'same',
  sameLimitMinutes: 30,
  dayLimits: {...DEFAULT_DAY_LIMITS},
};

export function getScreenTimeState(): ScreenTimeState {
  return {
    mode: state.mode,
    sameLimitMinutes: state.sameLimitMinutes,
    dayLimits: {...state.dayLimits},
  };
}

export function setScreenTimeMode(mode: ScreenTimeMode) {
  state = {...state, mode};
}

export function setSameLimitMinutes(minutes: DurationMinutes) {
  state = {...state, sameLimitMinutes: minutes};
}

export function setDayLimitMinutes(day: Weekday, minutes: DurationMinutes) {
  state = {...state, dayLimits: {...state.dayLimits, [day]: minutes}};
}

export function formatDuration(minutes: DurationMinutes): string {
  if (minutes < 60) return `${minutes} Mins`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h} Hrs`;
  return `${h} HR ${m} Mins`;
}

export function minutesToParts(minutes: DurationMinutes): {hours: number; mins: number} {
  return {hours: Math.floor(minutes / 60), mins: minutes % 60};
}

export function partsToMinutes(hours: number, mins: number): DurationMinutes {
  return hours * 60 + mins;
}

export function matchPresetId(minutes: DurationMinutes): string {
  const preset = PRESET_LIMITS.find(p => p.minutes === minutes);
  return preset?.id ?? 'custom';
}
