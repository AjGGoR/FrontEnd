import type { TemperatureUnit } from '../types/weather'

export const formatTemp = (tempC: number, unit: TemperatureUnit): string => {
	const value = convertTempValue(tempC, unit)
	const suffix = unitSymbol(unit)
	return `${Math.round(value)}${suffix}`
}

export const convertTempValue = (tempC: number, unit: TemperatureUnit): number => {
	switch (unit) {
		case 'imperial':
			return tempC * 1.8 + 32
		case 'standard':
			return tempC + 273.15
		default:
			return tempC
	}
}

export const unitSymbol = (unit: TemperatureUnit): string => {
	switch (unit) {
		case 'imperial':
			return '°F'
		case 'standard':
			return ' K'
		default:
			return '°C'
	}
}

export const formatWind = (speedMs: number, unit: TemperatureUnit): string => {
	if (unit === 'imperial') {
		const mph = speedMs * 2.23694
		return `${mph.toFixed(1)} mph`
	}
	return `${speedMs.toFixed(1)} m/s`
}

export const directionLabel = (deg: number): string => {
	const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
	const index = Math.round(deg / 45) % 8
	return dirs[index]
}
