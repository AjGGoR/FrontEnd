import type { CityWeather, TemperatureUnit } from '../types/weather'
import { directionLabel, formatTemp, formatWind } from '../utils/units'

type Props = {
	data: CityWeather
	unit: TemperatureUnit
	isFavorite: boolean
	onToggleFavorite: () => void
	onOpen: () => void
}

export const CityCard = ({ data, unit, isFavorite, onToggleFavorite, onOpen }: Props) => {
	const iconUrl = `https://openweathermap.org/img/wn/${data.current.icon}@2x.png`

	return (
		<div className='group relative flex h-full flex-col justify-between bg-gradient-to-br from-deep/80 to-dark/60 p-6 shadow-glass backdrop-blur-sm border border-white/5 rounded-3xl hover:border-primary/30 transition-all duration-300'>
			<div className='flex items-start justify-between gap-3'>
				<div>
					<span className='inline-block px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-md mb-2'>{data.city.country}</span>
					<h3 className='text-2xl font-bold tracking-tight text-soft'>{data.city.name}</h3>
				</div>
				<button
					onClick={onToggleFavorite}
					className={`w-10 h-10 flex items-center justify-center rounded-xl text-lg transition-all duration-200 ${
						isFavorite
							? 'bg-accent text-dark shadow-glow'
							: 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-accent'
					}`}
				>
					{isFavorite ? '★' : '☆'}
				</button>
			</div>

			<div className='mt-5 flex items-center gap-5'>
				<div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center'>
					<img src={iconUrl} alt={data.current.description} className='h-14 w-14 drop-shadow-lg' />
				</div>
				<div>
					<div className='text-5xl font-bold text-soft'>
						{formatTemp(data.current.tempC, unit)}
					</div>
					<p className='text-gray-400 capitalize font-medium'>{data.current.description}</p>
				</div>
			</div>

			<div className='mt-5 flex gap-2'>
				<div className='flex-1 bg-white/5 px-3 py-3 rounded-xl text-center'>
					<p className='text-xs text-gray-500 font-medium'>Wiatr</p>
					<p className='text-soft font-bold'>{formatWind(data.current.windSpeedMs, unit)}</p>
					<p className='text-xs text-primary'>{directionLabel(data.current.windDeg)}</p>
				</div>
				<div className='flex-1 bg-white/5 px-3 py-3 rounded-xl text-center'>
					<p className='text-xs text-gray-500 font-medium'>Chmury</p>
					<p className='text-soft font-bold'>{data.current.clouds}%</p>
				</div>
				<div className='flex-1 bg-white/5 px-3 py-3 rounded-xl text-center'>
					<p className='text-xs text-gray-500 font-medium'>Wilgoć</p>
					<p className='text-soft font-bold'>{data.current.humidity}%</p>
				</div>
			</div>

			<button
				onClick={onOpen}
				className='mt-5 w-full py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-xl shadow-glow hover:shadow-lg hover:scale-[1.02] transition-all duration-200'
			>
				Pokaż szczegóły
			</button>
		</div>
	)
}
