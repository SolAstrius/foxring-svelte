export interface Member {
  alias: string;
  url: string;
  title: string;
  icon: string;
  online: boolean;
}

export const members: Member[] = [
  { alias: "foxring", url: "https://foxr.ing",    title: "Foxring",  icon: "/fox.gif", online: true },
  { alias: "aaaa",    url: "https://aaaa.example", title: "AAAA",     icon: "",         online: true },
  { alias: "bbbb",    url: "https://bbbb.example", title: "BBBB",     icon: "",         online: true },
  { alias: "cccc",    url: "https://cccc.example", title: "CCCC",     icon: "",         online: true },
  { alias: "dddd",    url: "https://dddd.example", title: "DDDD",     icon: "",         online: true },
  { alias: "eeee",    url: "https://eeee.example", title: "EEEE",     icon: "",         online: true },
  { alias: "ffff",    url: "https://ffff.example", title: "FFFF",     icon: "",         online: true },
];
