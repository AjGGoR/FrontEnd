import { NavLink } from 'react-router-dom'
import { UnitSwitch } from './UnitSwitch'

export const TopBar = () => (
	<header className='sticky top-0 z-20 flex items-center justify-between gap-6 bg-dark/90 px-6 py-5 backdrop-blur-xl border-b-2 border-primary/20'>
		<div className='flex items-center gap-4'>
			<div className='w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-glow'>
				☀
			</div>
			<div>
				<h1 className='text-xl font-bold text-soft tracking-tight'>WeatherApp</h1>
				<p className='text-xs text-gray-400 font-medium'>Prognoza pogody</p>
			</div>
		</div>
		<nav className='flex items-center gap-2'>
			<NavLink
				to='/'
				className={({ isActive }) =>
					`px-5 py-2.5 font-medium text-sm transition-all duration-200 border-b-2 ${
						isActive 
							? 'text-primary border-primary' 
							: 'text-gray-400 border-transparent hover:text-soft hover:border-gray-500'
					}`
				}
			>
				Przegląd
			</NavLink>
			<NavLink
				to='/favorites'
				className={({ isActive }) =>
					`px-5 py-2.5 font-medium text-sm transition-all duration-200 border-b-2 ${
						isActive 
							? 'text-primary border-primary' 
							: 'text-gray-400 border-transparent hover:text-soft hover:border-gray-500'
					}`
				}
			>
				Zapisane
			</NavLink>
		</nav>
		<UnitSwitch />
	</header>
)
