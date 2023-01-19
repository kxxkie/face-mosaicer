import { atom, useAtom } from 'jotai';

const themes = ['light', 'dark'] as const;

type Theme = (typeof themes)[number];

const themeAtom = atom<Theme>('dark');

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return { theme, setTheme };
};
