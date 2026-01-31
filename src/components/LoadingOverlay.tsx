type Props = {
	label?: string
}

export const LoadingOverlay = ({ label }: Props) => (
	<div className='flex flex-col items-center justify-center py-16 px-8'>
		<div className='relative'>
			<div className='w-16 h-16 rounded-full border-4 border-deep animate-spin border-t-primary' />
			<div className='absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent animate-ping border-t-accent opacity-20' />
		</div>
		<p className='mt-6 text-base font-medium text-gray-400'>{label ?? 'Ładuję dane pogodowe...'}</p>
		<div className='mt-2 flex gap-1'>
			<span className='w-2 h-2 rounded-full bg-primary animate-bounce' style={{ animationDelay: '0ms' }} />
			<span className='w-2 h-2 rounded-full bg-accent animate-bounce' style={{ animationDelay: '150ms' }} />
			<span className='w-2 h-2 rounded-full bg-primary animate-bounce' style={{ animationDelay: '300ms' }} />
		</div>
	</div>
)
