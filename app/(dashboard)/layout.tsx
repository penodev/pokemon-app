import Link from "next/link";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Link
        href='/poke-manage'
        className='absolute text-xs top-3 right-3 underline cursor-pointer
      hover:text-slate-500'
      >
        manage pokemon
      </Link>
      {children}
    </div>
  );
};
export default DashboardLayout;
