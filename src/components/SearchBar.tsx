import type { FormEvent } from 'react'
import { useState } from 'react'

type Props = {
	onSearch: (query: string) => void
	placeholder?: string
}

export const SearchBar = ({ onSearch, placeholder }: Props) => {
	const [value, setValue] = useState('')

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (!value.trim()) return
		onSearch(value.trim())
	}

	return (
		<form onSubmit={handleSubmit} className='flex w-full gap-2'>
			<div className='relative flex-1'>
				<span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'>🔍</span>
				<input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={placeholder ?? 'Wpisz miasto...'}
					className='w-full pl-11 pr-4 py-3.5 bg-deep/80 border-2 border-white/10 rounded-2xl text-soft placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors duration-200'
				/>
			</div>
			<button
				type='submit'
				className='px-7 py-3.5 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-2xl shadow-glow hover:opacity-90 transition-opacity duration-200'
			>
				Szukaj
			</button>
		</form>
	)
}
