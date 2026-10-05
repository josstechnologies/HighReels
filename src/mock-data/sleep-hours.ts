import type {TimeOfDay} from '@/components/TimePickerWheel';

export type SleepHoursState = {
  enabled: boolean;
  start: TimeOfDay;
  end: TimeOfDay;
};

export const SLEEP_HOURS_INTRO =
  "Mute notifications during rest time. We'll notify you before your sleep hours begin and end.";

let state: SleepHoursState = {
  enabled: true,
  start: {hour: 10, minute: 0, period: 'PM'},
  end: {hour: 10, minute: 0, period: 'PM'},
};

export function getSleepHoursState(): SleepHoursState {
  return {
    enabled: state.enabled,
    start: {...state.start},
    end: {...state.end},
  };
}

export function saveSleepHoursState(next: SleepHoursState) {
  state = {
    enabled: next.enabled,
    start: {...next.start},
    end: {...next.end},
  };
}
