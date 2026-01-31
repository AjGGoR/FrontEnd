import axios from 'axios'
import type { CityWeather, ForecastDay, ForecastEntry, PrecipitationType } from '../types/weather'

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY || 'a6854f3c923df160f40fd9ccb8e71795'

const client = axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5',
	timeout: 12_000
})

type WeatherResponse = {
	id: number
	name: string
	coord: { lat: number; lon: number }
	sys: { country: string }
	weather: { description: string; icon: string }[]
	main: {
		temp: number
		feels_like: number
		humidity: number
		pressure: number
	}
	wind: { speed: number; deg: number }
	clouds: { all: number }
	rain?: { [key: string]: number }
	snow?: { [key: string]: number }
}

type ForecastResponse = {
	city: {
		id: number
		name: string
		country: string
		coord: { lat: number; lon: number }
	}
	list: Array<{
		dt_txt: string
		weather: { description: string; icon: string }[]
		main: {
			temp: number
			feels_like: number
			humidity: number
			pressure: number
			temp_min: number
			temp_max: number
		}
		wind: { speed: number; deg: number }
		clouds: { all: number }
		pop: number
		rain?: { [key: string]: number }
		snow?: { [key: string]: number }
	}>
}

const getPrecipitation = (entry: {
	rain?: Record<string, number>
	snow?: Record<string, number>
}): { amount: number; type: PrecipitationType } => {
	const rainAmount = entry.rain?.['1h'] ?? entry.rain?.['3h'] ?? 0
	const snowAmount = entry.snow?.['1h'] ?? entry.snow?.['3h'] ?? 0
	if (rainAmount > snowAmount && rainAmount > 0) return { amount: rainAmount, type: 'rain' }
	if (snowAmount > rainAmount && snowAmount > 0) return { amount: snowAmount, type: 'snow' }
	if (rainAmount === snowAmount && rainAmount > 0) return { amount: rainAmount, type: 'rain' }
	return { amount: 0, type: 'none' }
}

const mapForecastEntry = (raw: ForecastResponse['list'][number]): ForecastEntry => {
	const { amount, type } = getPrecipitation(raw)
	return {
		date: raw.dt_txt,
		tempC: raw.main.temp,
		feelsLikeC: raw.main.feels_like,
		description: raw.weather[0]?.description ?? 'Unknown',
		icon: raw.weather[0]?.icon ?? '01d',
		pop: raw.pop ?? 0,
		precipitationMm: amount,
		precipitationType: type,
		windSpeedMs: raw.wind.speed,
		windDeg: raw.wind.deg,
		clouds: raw.clouds.all
	}
}

const aggregateForecast = (list: ForecastEntry[]): ForecastDay[] => {
	const grouped = new Map<string, ForecastEntry[]>()
	list.forEach((entry) => {
		const key = entry.date.split(' ')[0]
		if (!grouped.has(key)) grouped.set(key, [])
		grouped.get(key)!.push(entry)
	})

	return Array.from(grouped.entries())
		.sort(([a], [b]) => (a > b ? 1 : -1))
		.slice(0, 5)
		.map(([date, entries]) => {
			const minTempC = Math.min(...entries.map((e) => e.tempC))
			const maxTempC = Math.max(...entries.map((e) => e.tempC))
			const popAvg = entries.reduce((sum, e) => sum + (e.pop ?? 0), 0) / entries.length
			const precipitationMm = entries.reduce((sum, e) => sum + e.precipitationMm, 0)
			const precipitationType = entries.some((e) => e.precipitationType === 'snow')
				? 'snow'
				: entries.some((e) => e.precipitationType === 'rain')
				? 'rain'
				: 'none'
			const noonEntry =
				entries.find((e) => e.date.includes('12:00:00')) ?? entries[Math.floor(entries.length / 2)]

			return {
				date,
				minTempC,
				maxTempC,
				popAvg,
				precipitationMm,
				precipitationType,
				icon: noonEntry.icon,
				description: noonEntry.description
			}
		})
}

export const fetchCityWeather = async (query: string): Promise<CityWeather> => {
	const [currentRes, forecastRes] = await Promise.all([
		client.get<WeatherResponse>('/weather', {
			params: { q: query, appid: API_KEY, units: 'metric' }
		}),
		client.get<ForecastResponse>('/forecast', {
			params: { q: query, appid: API_KEY, units: 'metric' }
		})
	])

	const current = currentRes.data
	const forecastRaw = forecastRes.data

	const { amount, type } = getPrecipitation(current)

	const normalized: CityWeather = {
		city: {
			id: current.id,
			name: current.name,
			country: current.sys.country,
			lat: current.coord.lat,
			lon: current.coord.lon
		},
		current: {
			tempC: current.main.temp,
			feelsLikeC: current.main.feels_like,
			description: current.weather[0]?.description ?? 'Unknown',
			icon: current.weather[0]?.icon ?? '01d',
			humidity: current.main.humidity,
			pressure: current.main.pressure,
			clouds: current.clouds.all,
			windSpeedMs: current.wind.speed,
			windDeg: current.wind.deg,
			precipitationMm: amount,
			precipitationType: type
		},
		forecast: aggregateForecast(forecastRaw.list.map(mapForecastEntry)),
		fetchedAt: Date.now()
	}

	return normalized
}

export const fetchCityWeatherById = async (id: number | string): Promise<CityWeather> => {
	const [currentRes, forecastRes] = await Promise.all([
		client.get<WeatherResponse>('/weather', { params: { id, appid: API_KEY, units: 'metric' } }),
		client.get<ForecastResponse>('/forecast', { params: { id, appid: API_KEY, units: 'metric' } })
	])

	const current = currentRes.data
	const forecastRaw = forecastRes.data
	const { amount, type } = getPrecipitation(current)

	return {
		city: {
			id: current.id,
			name: current.name,
			country: current.sys.country,
			lat: current.coord.lat,
			lon: current.coord.lon
		},
		current: {
			tempC: current.main.temp,
			feelsLikeC: current.main.feels_like,
			description: current.weather[0]?.description ?? 'Unknown',
			icon: current.weather[0]?.icon ?? '01d',
			humidity: current.main.humidity,
			pressure: current.main.pressure,
			clouds: current.clouds.all,
			windSpeedMs: current.wind.speed,
			windDeg: current.wind.deg,
			precipitationMm: amount,
			precipitationType: type
		},
		forecast: aggregateForecast(forecastRaw.list.map(mapForecastEntry)),
		fetchedAt: Date.now()
	}
}
