export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  size?: number;
  variant?: 'solid' | 'dashed';
} & React.HTMLAttributes<HTMLHRElement>;
