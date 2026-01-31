import type { ForecastDay, TemperatureUnit } from '../types/weather'
import { formatTemp } from '../utils/units'

const formatDate = (iso: string) => {
	const date = new Date(iso)
	return date.toLocaleDateString('pl-PL', { weekday: 'short', day: '2-digit', month: 'short' })
}

type Props = {
	days: ForecastDay[]
	unit: TemperatureUnit
}

export const ForecastStrip = ({ days, unit }: Props) => (
	<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
		{days.map((day, index) => (
			<div
				key={day.date}
				className={`relative overflow-hidden bg-gradient-to-b from-deep/80 to-dark/40 p-5 rounded-2xl border transition-all duration-300 hover:scale-105 ${
					index === 0 ? 'border-primary/40 shadow-glow' : 'border-white/5 hover:border-accent/30'
				}`}
			>
				{index === 0 && <span className='absolute top-2 right-2 text-xs font-bold text-primary bg-primary/20 px-2 py-0.5 rounded-md'>Dziś</span>}
				<p className='text-sm font-bold text-soft'>{formatDate(day.date)}</p>
				<div className='flex justify-center my-3'>
					<div className='w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center'>
						<img
							src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
							alt={day.description}
							className='h-12 w-12'
						/>
					</div>
				</div>
				<p className='text-sm text-gray-400 capitalize text-center mb-3'>{day.description}</p>
				<div className='flex items-center justify-center gap-3'>
					<span className='text-xl font-bold text-primary'>{formatTemp(day.maxTempC, unit)}</span>
					<span className='text-gray-500'>/</span>
					<span className='text-lg text-gray-400'>{formatTemp(day.minTempC, unit)}</span>
				</div>
				<div className='mt-4 pt-3 border-t border-white/10 space-y-1'>
					<p className='text-xs text-gray-500 flex justify-between'>
						<span>Opady</span>
						<span className='text-accent font-medium'>{day.precipitationMm.toFixed(1)} mm</span>
					</p>
					<p className='text-xs text-gray-500 flex justify-between'>
						<span>Szansa</span>
						<span className='text-soft font-medium'>{Math.round(day.popAvg * 100)}%</span>
					</p>
				</div>
			</div>
		))}
	</div>
)
