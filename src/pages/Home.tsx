import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import { CityCard } from '../components/CityCard'
import { LoadingOverlay } from '../components/LoadingOverlay'
import { defaultCities } from '../constants/cities'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleFavorite } from '../store/favoritesSlice'
import { fetchWeather } from '../store/weatherSlice'

export const Home = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const unit = useAppSelector((s) => s.settings.unit)
	const favorites = useAppSelector((s) => s.favorites.ids)
	const weatherEntities = useAppSelector((s) => s.weather.entities)
	const fetching = useAppSelector((s) => s.weather.fetching)
	const errors = useAppSelector((s) => s.weather.errors)

	useEffect(() => {
		defaultCities.forEach((city) => {
			const key = city.toLowerCase()
			if (!fetching[key] || fetching[key] === 'idle' || fetching[key] === 'failed') {
				dispatch(fetchWeather(city))
			}
		})
	}, [dispatch])

	const handleSearch = useCallback(
		(query: string) => {
			dispatch(fetchWeather(query))
		},
		[dispatch]
	)

	const cards = useMemo(() => Object.values(weatherEntities), [weatherEntities])

	const hasDefaultsLoaded = defaultCities.every((city) =>
		cards.some((c) => c.city.name.toLowerCase() === city.toLowerCase())
	)

	const lastError = Object.values(errors).find(Boolean)

	return (
		<div className='space-y-8'>
			{/* Hero Search Section */}
			<div className='relative overflow-hidden bg-gradient-to-r from-deep via-dark to-deep p-8 rounded-3xl border border-white/5 shadow-glass'>
				<div className='absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
				<div className='absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
				<div className='relative z-10'>
					<div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
						<div className='space-y-2'>
							<span className='inline-block px-3 py-1 text-xs font-bold bg-primary/20 text-primary rounded-lg'>Przeglądaj pogodę</span>
							<h2 className='text-3xl lg:text-4xl font-bold text-soft'>Aktualne warunki</h2>
							<p className='text-gray-400 max-w-md'>Sprawdź pogodę w popularnych miastach lub wyszukaj dowolną lokalizację na świecie.</p>
						</div>
						<div className='w-full lg:w-[480px]'>
							<SearchBar onSearch={handleSearch} placeholder='Wyszukaj miasto (np. Berlin, Tokyo...)' />
						</div>
					</div>
				</div>
				{lastError ? (
					<div className='relative z-10 mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl'>
						<p className='text-sm text-red-400 flex items-center gap-2'>
							<span>⚠️</span> Nie udało się pobrać danych: {lastError}
						</p>
					</div>
				) : null}
			</div>

			{!hasDefaultsLoaded && cards.length === 0 ? (
				<LoadingOverlay label='Ładuję startowe miasta...' />
			) : null}

			{/* Cities Grid */}
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
				{cards.map((city) => (
					<CityCard
						key={city.city.id}
						data={city}
						unit={unit}
						isFavorite={favorites.includes(city.city.id)}
						onToggleFavorite={() => dispatch(toggleFavorite(city.city.id))}
						onOpen={() => navigate(`/city/${city.city.id}`)}
					/>
				))}
			</div>
		</div>
	)
}
