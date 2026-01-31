import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TemperatureUnit } from '../types/weather'

export type SettingsState = {
	unit: TemperatureUnit
}

const initialState: SettingsState = {
	unit: 'metric'
}

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setUnit: (state, action: PayloadAction<TemperatureUnit>) => {
			state.unit = action.payload
		}
	}
})

export const { setUnit } = settingsSlice.actions
export default settingsSlice.reducer
