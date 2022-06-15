import { useTheme, Switch, changeTheme } from '@nextui-org/react';

export default () => {
  const { type, isDark } = useTheme();

  const handleChange = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    window.localStorage.setItem('data-theme', nextTheme); // you can use any storage
    changeTheme(nextTheme);
  };

  return (
    <div>
      The current theme is: {type}
      <Switch checked={isDark} onChange={handleChange} />
    </div>
  );
};
