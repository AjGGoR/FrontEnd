import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CityCard } from '../components/CityCard'
import { LoadingOverlay } from '../components/LoadingOverlay'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleFavorite } from '../store/favoritesSlice'
import { fetchWeatherById } from '../store/weatherSlice'

export const Favorites = () => {
	const favorites = useAppSelector((s) => s.favorites.ids)
	const weather = useAppSelector((s) => s.weather.entities)
	const unit = useAppSelector((s) => s.settings.unit)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		favorites.forEach((id) => {
			if (!weather[id]) {
				dispatch(fetchWeatherById(id))
			}
		})
	}, [dispatch, favorites])

	const favoriteCards = useMemo(
		() => favorites.map((id) => weather[id]).filter(Boolean),
		[favorites, weather]
	)

	if (favorites.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center py-20 text-center'>
				<div className='w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6'>
					<span className='text-5xl'>⭐</span>
				</div>
				<h2 className='text-2xl font-bold text-soft mb-2'>Brak zapisanych miast</h2>
				<p className='text-gray-400 max-w-md mb-6'>Dodaj miasta do ulubionych klikając ikonę gwiazdki na karcie miasta, aby mieć do nich szybki dostęp.</p>
				<button
					onClick={() => navigate('/')}
					className='px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-glow hover:opacity-90 transition-opacity'
				>
					Przeglądaj miasta
				</button>
			</div>
		)
	}

	return (
		<div className='space-y-8'>
			{/* Header */}
			<div className='relative overflow-hidden bg-gradient-to-r from-accent/10 via-transparent to-primary/10 p-8 rounded-3xl border border-white/5'>
				<div className='flex items-center gap-4'>
					<div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-2xl shadow-glow'>
						⭐
					</div>
					<div>
						<h2 className='text-3xl font-bold text-soft'>Zapisane miasta</h2>
						<p className='text-gray-400'>Masz <span className='text-primary font-semibold'>{favorites.length}</span> {favorites.length === 1 ? 'zapisane miasto' : favorites.length < 5 ? 'zapisane miasta' : 'zapisanych miast'}</p>
					</div>
				</div>
			</div>

			{favoriteCards.length === 0 ? (
				<LoadingOverlay label='Pobieram dane zapisanych miast...' />
			) : (
				<div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
					{favoriteCards.map((city) => (
						<CityCard
							key={city!.city.id}
							data={city!}
							unit={unit}
							isFavorite
							onToggleFavorite={() => dispatch(toggleFavorite(city!.city.id))}
							onOpen={() => navigate(`/city/${city!.city.id}`)}
						/>
					))}
				</div>
			)}
		</div>
	)
}
