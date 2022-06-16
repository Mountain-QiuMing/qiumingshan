import { Switch, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import { SunLineIcon, MoonLineIcon } from 'ultra-icon';

export default () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  return (
    <div>
      <Switch
        checked={isDark}
        onChange={e => setTheme(e.target.checked ? 'dark' : 'light')}
        icon={isDark ? <MoonLineIcon /> : <SunLineIcon />}
      />
    </div>
  );
};
