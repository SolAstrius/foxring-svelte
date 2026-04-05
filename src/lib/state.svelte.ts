export type AccentName = 'rose' | 'violet' | 'teal' | 'blue' | 'amber';

export const accents: Record<AccentName, { light: [string, string, string]; dark: [string, string, string] }> = {
  rose:   { light: ['#c46b7a', '#a35663', '#8a3a4a'], dark: ['#d4808e', '#b35a68', '#8a3a4a'] },
  violet: { light: ['#8b6bc4', '#7355a3', '#5a3d8a'], dark: ['#a080d4', '#8568b3', '#5a3d8a'] },
  teal:   { light: ['#5a9e8f', '#4a8677', '#366b5e'], dark: ['#6eb8a6', '#5a9e8f', '#366b5e'] },
  blue:   { light: ['#6b8fc4', '#5577a3', '#3d5f8a'], dark: ['#80a0d4', '#6888b3', '#3d5f8a'] },
  amber:  { light: ['#c4956b', '#a37d55', '#8a653d'], dark: ['#d4a880', '#b39068', '#8a653d'] },
};

export const accentNames = Object.keys(accents) as AccentName[];

export const app = $state({
  trunic: typeof localStorage !== "undefined" && localStorage.getItem("trunic") === "true",
  theme: (typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null) as 'light' | 'dark' | null,
  accent: ((typeof localStorage !== "undefined" && localStorage.getItem("accent")) || 'rose') as AccentName,
});

export const pages = [
  { path: "/", num: 1 },
  { path: "/join", num: 2 },
  { path: "/widgets", num: 3 },
  { path: "/about", num: 4 },
  { path: "/manage", num: 5 },
];
