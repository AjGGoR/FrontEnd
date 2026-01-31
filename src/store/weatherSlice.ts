import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchCityWeather, fetchCityWeatherById } from '../api/openWeather'
import type { CityWeather } from '../types/weather'

export type WeatherState = {
	entities: Record<number, CityWeather>
	fetching: Record<string, 'idle' | 'loading' | 'succeeded' | 'failed'>
	errors: Record<string, string | undefined>
}

const initialState: WeatherState = {
	entities: {},
	fetching: {},
	errors: {}
}

export const fetchWeather = createAsyncThunk<CityWeather, string>(
	'weather/fetch',
	async (query: string) => {
		const data = await fetchCityWeather(query)
		return data
	}
)

export const fetchWeatherById = createAsyncThunk<CityWeather, number | string>(
	'weather/fetchById',
	async (id: number | string) => {
		const data = await fetchCityWeatherById(id)
		return data
	}
)

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		upsertWeather: (state, action: PayloadAction<CityWeather>) => {
			const payload = action.payload
			state.entities[payload.city.id] = payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeather.pending, (state, action) => {
				const query = action.meta.arg.toLowerCase()
				state.fetching[query] = 'loading'
				state.errors[query] = undefined
			})
			.addCase(fetchWeather.fulfilled, (state, action) => {
				const query = action.meta.arg.toLowerCase()
				const payload = action.payload
				state.entities[payload.city.id] = payload
				state.fetching[query] = 'succeeded'
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				const query = action.meta.arg.toLowerCase()
				state.fetching[query] = 'failed'
				state.errors[query] = action.error.message
			})
			.addCase(fetchWeatherById.pending, (state, action) => {
				const key = String(action.meta.arg)
				state.fetching[key] = 'loading'
				state.errors[key] = undefined
			})
			.addCase(fetchWeatherById.fulfilled, (state, action) => {
				const key = String(action.meta.arg)
				const payload = action.payload
				state.entities[payload.city.id] = payload
				state.fetching[key] = 'succeeded'
			})
			.addCase(fetchWeatherById.rejected, (state, action) => {
				const key = String(action.meta.arg)
				state.fetching[key] = 'failed'
				state.errors[key] = action.error.message
			})
	}
})

export const { upsertWeather } = weatherSlice.actions
export default weatherSlice.reducer
