import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type FavoritesState = {
	ids: number[]
}

const initialState: FavoritesState = {
	ids: []
}

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		toggleFavorite: (state, action: PayloadAction<number>) => {
			const id = action.payload
			if (state.ids.includes(id)) {
				state.ids = state.ids.filter((item) => item !== id)
			} else {
				state.ids.push(id)
			}
		},
		setFavorites: (state, action: PayloadAction<number[]>) => {
			state.ids = action.payload
		}
	}
})

export const { toggleFavorite, setFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
