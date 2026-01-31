import { combineReducers, configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './favoritesSlice'
import type { FavoritesState } from './favoritesSlice'
import { loadState, persistStore } from './persist'
import settingsReducer from './settingsSlice'
import type { SettingsState } from './settingsSlice'
import weatherReducer from './weatherSlice'
import type { WeatherState } from './weatherSlice'

const preloadedState: Partial<{
	favorites: FavoritesState
	settings: SettingsState
	weather: WeatherState
}> = loadState() ?? {}

const rootReducer = combineReducers({
	favorites: favoritesReducer,
	settings: settingsReducer,
	weather: weatherReducer
})

export const store = configureStore({
	reducer: rootReducer,
	preloadedState
})

persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
