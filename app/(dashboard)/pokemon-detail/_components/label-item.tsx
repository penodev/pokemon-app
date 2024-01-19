interface LabelItemProps {
  title: string;
  value?: string | number;
}
export const LabelItem = ({ title, value }: LabelItemProps) => {
  return (
    <div>
      <span className='capitalize'>{title}</span>: {value}
    </div>
  );
};
