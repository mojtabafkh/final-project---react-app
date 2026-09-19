import { LoaderCircle, LucideLogOut, LucideMoon, LucideSun } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import type { User } from "../../types/user";
import { GlobalContext } from "../../contexts/GlobalContext";
import { getMeApi } from "../../service/me-service";


const Header = () => {

	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);
	const [mainLoading, setMainLoading] = useState(true);
	const { theme, toggleTheme } = useContext(GlobalContext)

	const afterLogout = () => {
		sessionStorage.removeItem('token');
		navigate('/login')
	}

	const links = [
		{ title: 'Home', link: '/app/home' },
		{ title: 'About Us', link: '/app/about-us' },
		{ title: 'Contact Us', link: '/app/contact-us' },
		{ title: 'Todo List', link: '/app/todo-list' },
		{ title: 'Posts', link: '/app/posts' },
		{ title: 'Drop Drilling', link: '/app/drop-drilling' },
		{ title: 'Test Context', link: '/app/test-context' },
		{ title: 'shop', link: '/app/shop' },
	]

	// const getMeApi = async () => {
	// 	const res = await fetch(`${DUMMY_BASE_URL}/auth/me`, {
	// 		method: 'GET',
	// 		headers: {
	// 			'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Pass JWT via Authorization header
	// 		}
	// 	})

	// 	const data = await res.json()
	// 	if (res.ok) {
	// 		return data
	// 	} else {
	// 		toast.error(data.message);
	// 		afterLogout();
	// 	}
	// }

	const getMeData = async () => {
		const data = await getMeApi();
		setUser(data);
		setMainLoading(false)
	}

	useEffect(() => {
		if (!sessionStorage.getItem('token')) {
			navigate('/login')
		} else {
			getMeData();
		}
	}, [])

	const logout = () => {
		if (!confirm('Are you sure to want to logout?')) {
			return
		}
		afterLogout();
	}

	return (
		<>
			<header className="bg-slate-800 p-4 fixed top-0 bottom-0 left-0 w-64 flex flex-col overflow-y-auto">
				<div className="flex flex-col items-center gap-4 mb-8 pb-6 border-b border-slate-700 text-white w-full">

					{
						<span onClick={toggleTheme} className="self-end cursor-pointer text-slate-400 hover:text-white transition-colors">
							{theme === 'light' ? <LucideMoon size={18} /> : <LucideSun size={18} />}
						</span>
					}

					<Link to="/app/profile" className="flex flex-col items-center gap-2 text-center hover:opacity-90 transition-opacity">
						<img src={user?.image} alt={user?.firstName + ' ' + user?.lastName} className="w-14 h-14 p-0.5 bg-slate-700 rounded-full object-cover ring-2 ring-slate-600" />
						<span className="text-sm font-semibold text-slate-100">
							{user?.firstName + ' ' + user?.lastName}
						</span>
					</Link>

					<button onClick={logout} className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-300 cursor-pointer transition-colors">
						<LucideLogOut size={14} />
						Logout
					</button>
				</div>
				<nav className="flex justify- px-4">
					<ul className="flex flex-col justify-center gap-8">
						{
							links.map((item, index) => {
								return (
									<li key={index}>
										<NavLink
											to={item.link}
											className={({ isActive }) => `text-xl text-gray-400 hover:text-gray-300 ${isActive ? 'text-blue-500!' : ''}`}
										>
											{item.title}
										</NavLink>
									</li>
								)
							})
						}

					</ul>

				</nav>
			</header>

			{
				mainLoading &&
				<div className="w-screen h-screen fixed top-0 right-0 bg-slate-700 text-white text-3xl flex gap-3 flex-col justify-center items-center">
					<LoaderCircle size={50} className="animate-spin" />
					Please Wait A Moment ...
				</div>
			}


		</>
	)
}

export default Header