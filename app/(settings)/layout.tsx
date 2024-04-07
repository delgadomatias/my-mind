interface Props {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default SettingsLayout;
