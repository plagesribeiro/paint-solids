import arte from 'assets/ARTE.png';
import geek from 'assets/GEEK.png';
import kids from 'assets/KIDS.png';

export const existingCollections = [
	{
		id: 'geek',
		name: 'Geek',
		description: 'Coleção Geek',
		image: geek,
		stripeMonthlyUrl: 'https://guru.paintsolids.com.br/subscribe/geek-1-mes',
		stripeTriMonthlyUrl:
			'https://guru.paintsolids.com.br/subscribe/geek-3-meses',
		stripeSemiAnnualUrl:
			'https://guru.paintsolids.com.br/subscribe/geek-6-meses',
		stripeAnnualUrl: 'https://guru.paintsolids.com.br/subscribe/geek-anual'
	},
	{
		id: 'kids',
		name: 'Kids',
		description: 'Coleção Kids',
		image: kids,
		stripeMonthlyUrl: 'https://guru.paintsolids.com.br/subscribe/kids-1-mes',
		stripeTriMonthlyUrl:
			'https://guru.paintsolids.com.br/subscribe/kids-3-meses',
		stripeSemiAnnualUrl:
			'https://guru.paintsolids.com.br/subscribe/kids-6-meses',
		stripeAnnualUrl: 'https://guru.paintsolids.com.br/subscribe/kids-anual'
	},
	{
		id: 'arte',
		name: 'Arte',
		description: 'Coleção Arte',
		image: arte,
		stripeMonthlyUrl: 'https://guru.paintsolids.com.br/subscribe/arte-1-mes',
		stripeTriMonthlyUrl:
			'https://guru.paintsolids.com.br/subscribe/arte-3-meses',
		stripeSemiAnnualUrl:
			'https://guru.paintsolids.com.br/subscribe/arte-6-meses',
		stripeAnnualUrl: 'https://guru.paintsolids.com.br/subscribe/arte-anual'
	}
] as Collection[];

export const prices = [
	{
		id: 'anual',
		price: 'R$ 89,90',
		description:
			'Plano anual com +-20% de desconto. Esse plano conta com 1 Kit de Pintura de brinde que será entregue no primeiro mês.'
	},
	{
		id: 'semestral',
		price: 'R$ 94,90',
		description:
			'Plano semestral com +-15% de desconto. Esse plano conta com 1 Kit de Pintura de brinde que será entregue no primeiro mês.'
	},
	{
		id: 'trimestral',
		price: 'R$ 99,90',
		description:
			'Plano trimestral com +-10% de desconto. Esse plano conta com 1 Kit de Pintura de brinde que será entregue no primeiro mês.'
	},
	{
		id: 'mensal',
		price: 'R$ 109,90',
		description:
			'Plano mensal. Esse plano não conta com Kit de Pintura de brinde. Os primeiros 20 assinantes receberão um Kit de Pintura de brinde.'
	}
] as Price[];

export type Price = {
	id: string;
	price: string;
	description?: string;
};

export type Collection = {
	id: string;
	name: string;
	description: string;
	image: string;
	stripeMonthlyUrl: string;
	stripeTriMonthlyUrl: string;
	stripeSemiAnnualUrl: string;
	stripeAnnualUrl: string;
};
