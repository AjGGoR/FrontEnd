type MetricItem = {
	label: string
	value: string
	sub?: string
}

type Props = {
	items: MetricItem[]
}

export const MetricGrid = ({ items }: Props) => (
	<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
		{items.map((item) => (
			<div
				key={item.label}
				className='group bg-gradient-to-br from-deep to-dark/50 p-5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-200'
			>
				<p className='text-xs font-medium text-gray-500 mb-2'>{item.label}</p>
				<p className='text-2xl font-bold text-soft group-hover:text-primary transition-colors'>{item.value}</p>
				{item.sub ? <p className='text-sm text-accent mt-1'>{item.sub}</p> : null}
			</div>
		))}
	</div>
)
