import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setUnit } from '../store/settingsSlice'
import type { TemperatureUnit } from '../types/weather'

const options: { label: string; value: TemperatureUnit }[] = [
	{ label: '°C', value: 'metric' },
	{ label: '°F', value: 'imperial' },
	{ label: 'K', value: 'standard' }
]

export const UnitSwitch = () => {
	const unit = useAppSelector((s) => s.settings.unit)
	const dispatch = useAppDispatch()

	const activeClasses = useMemo(() => 'bg-primary text-white shadow-glow', [])

	return (
		<div className='inline-flex items-center gap-1 bg-deep/80 p-1.5 rounded-xl border border-white/10'>
			{options.map((opt) => (
				<button
					key={opt.value}
					onClick={() => dispatch(setUnit(opt.value))}
					className={`px-4 py-2 font-semibold text-sm transition-all duration-200 rounded-lg ${
						unit === opt.value
							? activeClasses
							: 'text-gray-400 hover:text-soft hover:bg-white/10'
					}`}
				>
					{opt.label}
				</button>
			))}
		</div>
	)
}
