export type AiLabGradient = 'soft' | 'soft20' | 'wash';

export const AI_LAB_GRADIENT = {
  from: '#E2EFFF',
  to: '#FDE7D9',
  from20: '#E2EFFF33',
  from40: '#E2EFFF66',
  soft: ['#E2EFFF', '#FDE7D9'] as [string, string],
  soft20: ['#E2EFFF33', '#FDE7D900'] as [string, string],
  wash: ['#E2EFFF66', '#FDE7D900'] as [string, string],
} as const;
