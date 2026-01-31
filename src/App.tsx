import { Route, Routes } from 'react-router-dom'
import { TopBar } from './components/TopBar'
import { CityDetail } from './pages/CityDetail'
import { Favorites } from './pages/Favorites'
import { Home } from './pages/Home'

function App() {
	return (
		<div className='min-h-screen text-soft'>
			<div className='mx-auto max-w-7xl px-6 pb-16'>
				<TopBar />
				<main className='mt-8'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/city/:id' element={<CityDetail />} />
						<Route path='/favorites' element={<Favorites />} />
					</Routes>
				</main>
			</div>
		</div>
	)
}

export default App
