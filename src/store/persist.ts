import type { FavoritesState } from './favoritesSlice'
import type { SettingsState } from './settingsSlice'

const STORAGE_KEY = 'weather-app-state'

export type PersistedState = {
	settings?: SettingsState
	favorites?: FavoritesState
}

export const loadState = (): PersistedState | undefined => {
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (!raw) return undefined
		return JSON.parse(raw) as PersistedState
	} catch (err) {
		console.warn('Cannot load persisted state', err)
		return undefined
	}
}

export const persistStore = (store: {
	getState: () => any
	subscribe: (listener: () => void) => () => void
}) => {
	const persist = () => {
		try {
			const state = store.getState()
			const slice: PersistedState = {
				settings: state.settings,
				favorites: state.favorites
			}
			localStorage.setItem(STORAGE_KEY, JSON.stringify(slice))
		} catch (err) {
			console.warn('Cannot persist state', err)
		}
	}

	persist()
	store.subscribe(persist)
}
