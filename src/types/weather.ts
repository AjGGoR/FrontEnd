export type TemperatureUnit = 'metric' | 'imperial' | 'standard'

export type CityRef = {
	id: number
	name: string
	country: string
	lat: number
	lon: number
}

export type PrecipitationType = 'rain' | 'snow' | 'none'

export type CurrentWeather = {
	tempC: number
	feelsLikeC: number
	description: string
	icon: string
	humidity: number
	pressure: number
	clouds: number
	windSpeedMs: number
	windDeg: number
	precipitationMm: number
	precipitationType: PrecipitationType
}

export type ForecastEntry = {
	date: string
	tempC: number
	feelsLikeC: number
	description: string
	icon: string
	pop: number
	precipitationMm: number
	precipitationType: PrecipitationType
	windSpeedMs: number
	windDeg: number
	clouds: number
}

export type ForecastDay = {
	date: string
	minTempC: number
	maxTempC: number
	popAvg: number
	precipitationMm: number
	precipitationType: PrecipitationType
	icon: string
	description: string
}

export type CityWeather = {
	city: CityRef
	current: CurrentWeather
	forecast: ForecastDay[]
	fetchedAt: number
}
