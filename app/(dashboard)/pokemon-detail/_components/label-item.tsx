interface LabelItemProps {
  title: string;
  value?: string | number;
}
export const LabelItem = ({ title, value }: LabelItemProps) => {
  return (
    <div>
      <span className='capitalize font-semibold mr-2'>{title}:</span>
      {value}
    </div>
  );
};
