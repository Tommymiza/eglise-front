import { icons, type LucideProps } from "lucide-react";

const Icon = ({
  name,
  ...props
}: LucideProps & { name: keyof typeof icons }) => {
  const LucideIcon: React.ElementType<LucideProps> = icons[name];
  return <LucideIcon {...props} />;
};

export default Icon;
