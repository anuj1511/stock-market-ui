import NavBar  from '@/app/ui/utility/NavBar'


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
	<div>
		<NavBar />
		{children}
	</div>
  );
}