import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ForecastStrip } from '../components/ForecastStrip'
import { LoadingOverlay } from '../components/LoadingOverlay'
import { MetricGrid } from '../components/MetricGrid'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleFavorite } from '../store/favoritesSlice'
import { fetchWeatherById } from '../store/weatherSlice'
import { directionLabel, formatTemp, formatWind, unitSymbol } from '../utils/units'

export const CityDetail = () => {
	const { id } = useParams()
	const cityId = id ? Number(id) : undefined
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const unit = useAppSelector((s) => s.settings.unit)
	const weather = useAppSelector((s) => (cityId ? s.weather.entities[cityId] : undefined))
	const isFavorite = useAppSelector((s) => (cityId ? s.favorites.ids.includes(cityId) : false))
	const fetching = useAppSelector((s) => (id ? s.weather.fetching[id] : 'idle'))

	useEffect(() => {
		if (cityId && !weather) {
			dispatch(fetchWeatherById(cityId))
		}
	}, [cityId, weather, dispatch])

	const today = weather?.forecast?.[0]

	const metrics = useMemo(() => {
		if (!weather) return []
		return [
			{
				label: 'Temp. odczuwalna',
				value: formatTemp(weather.current.feelsLikeC, unit)
			},
			{
				label: 'Wiatr',
				value: formatWind(weather.current.windSpeedMs, unit),
				sub: directionLabel(weather.current.windDeg)
			},
			{
				label: 'Zachmurzenie',
				value: `${weather.current.clouds}%`
			},
			{
				label: 'Wilgotność',
				value: `${weather.current.humidity}%`
			},
			{
				label: 'Ciśnienie',
				value: `${weather.current.pressure} hPa`
			},
			{
				label: 'Opady teraz',
				value: `${weather.current.precipitationMm.toFixed(1)} mm`,
				sub: weather.current.precipitationType
			},
			{
				label: 'Szansa opadów (dziś)',
				value: `${Math.round((today?.popAvg ?? 0) * 100)}%`,
				sub: today?.precipitationType ?? 'brak'
			}
		]
	}, [today, unit, weather])

	if (!cityId) {
		return <p className='text-soft text-center py-12'>Brak identyfikatora miasta.</p>
	}

	if (!weather && fetching === 'loading') {
		return <LoadingOverlay label='Pobieram prognozę...' />
	}

	if (!weather) {
		return (
			<div className='text-center py-16 space-y-4'>
				<div className='text-6xl mb-4'>🌧️</div>
				<p className='text-xl text-soft font-medium'>Nie znaleziono danych dla miasta</p>
				<button
					onClick={() => navigate('/')}
					className='mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-glow hover:opacity-90 transition-opacity'
				>
					← Wróć do listy
				</button>
			</div>
		)
	}

	const iconUrl = `https://openweathermap.org/img/wn/${weather.current.icon}@2x.png`

	return (
		<div className='space-y-8'>
			{/* Main Hero Card */}
			<div className='relative overflow-hidden rounded-3xl border border-white/5 shadow-glass'>
				<div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10' />
				<div className='absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2' />
				<div className='absolute bottom-0 left-0 w-64 h-64 bg-accent/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2' />
				
				<div className='relative z-10 p-8 lg:p-10'>
					<div className='flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
						<div className='flex items-center gap-6'>
							<div className='w-28 h-28 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10'>
								<img
									src={iconUrl}
									alt={weather.current.description}
									className='h-20 w-20 drop-shadow-lg'
								/>
							</div>
							<div>
								<span className='inline-block px-3 py-1 text-xs font-bold bg-accent/20 text-accent rounded-lg mb-2'>
									{weather.city.country}
								</span>
								<h2 className='text-4xl lg:text-5xl font-bold text-soft'>{weather.city.name}</h2>
								<p className='text-lg text-gray-400 capitalize mt-1'>{weather.current.description}</p>
							</div>
						</div>
						
						<div className='text-left lg:text-right'>
							<p className='text-7xl lg:text-8xl font-bold text-soft'>{formatTemp(weather.current.tempC, unit)}</p>
							<p className='text-gray-400 mt-2'>Jednostki: <span className='text-primary font-medium'>{unitSymbol(unit)}</span></p>
							<div className='mt-5 flex flex-wrap gap-3 justify-start lg:justify-end'>
								<button
									onClick={() => dispatch(toggleFavorite(weather.city.id))}
									className={`px-6 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${
										isFavorite
											? 'bg-accent text-dark shadow-glow'
											: 'bg-white/10 text-soft hover:bg-white/20 border border-white/10'
									}`}
								>
									{isFavorite ? '★ W ulubionych' : '☆ Dodaj do ulubionych'}
								</button>
								<button
									onClick={() => navigate('/')}
									className='px-6 py-3 bg-deep text-soft font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200'
								>
									← Powrót
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Metrics Section */}
			<section>
				<div className='flex items-center gap-3 mb-5'>
					<div className='w-1 h-6 bg-primary rounded-full' />
					<h3 className='text-xl font-bold text-soft'>Szczegółowe dane</h3>
				</div>
				<MetricGrid items={metrics} />
			</section>

			{/* Forecast Section */}
			<section className='bg-gradient-to-br from-deep/50 to-dark/30 p-6 lg:p-8 rounded-3xl border border-white/5 shadow-glass'>
				<div className='flex items-center justify-between mb-6'>
					<div className='flex items-center gap-3'>
						<div className='w-1 h-6 bg-accent rounded-full' />
						<div>
							<h3 className='text-xl font-bold text-soft'>Prognoza 5-dniowa</h3>
							<p className='text-sm text-gray-500'>Sprawdź nadchodzącą pogodę</p>
						</div>
					</div>
				</div>
				<ForecastStrip days={weather.forecast} unit={unit} />
			</section>
		</div>
	)
}
