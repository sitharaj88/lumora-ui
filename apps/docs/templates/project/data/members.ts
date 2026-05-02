export type Member = {
  id: string;
  initials: string;
  name: string;
  bg: string;
  role: string;
  capacity: number;
};

const grad = (a: string, b: string) =>
  `linear-gradient(135deg, var(--lm-color-${a}), var(--lm-color-${b}))`;

export const members: Member[] = [
  { id: "mk", initials: "MK", name: "Maya Krishnan", bg: grad("accent", "info"), role: "Tech lead", capacity: 24 },
  { id: "al", initials: "AL", name: "Alex Lin", bg: grad("primary", "accent"), role: "Engineer", capacity: 20 },
  { id: "rs", initials: "RS", name: "Riya Shah", bg: grad("success", "info"), role: "Engineer", capacity: 20 },
  { id: "sp", initials: "SP", name: "Sam Park", bg: grad("warning", "danger"), role: "Designer", capacity: 16 },
  { id: "jh", initials: "JH", name: "Jin Hong", bg: grad("info", "primary"), role: "Engineer", capacity: 20 },
  { id: "lr", initials: "LR", name: "Logan Reyes", bg: grad("primary", "accent"), role: "PM", capacity: 12 }
];

export function getMember(id: string) {
  return members.find((m) => m.id === id);
}
