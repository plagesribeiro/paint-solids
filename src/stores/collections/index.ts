import arte from 'assets/ARTE.png';
import geek from 'assets/GEEK.png';
import kids from 'assets/KIDS.png';

export const existingCollections = [
	{
		id: 'geek',
		name: 'Geek',
		description: 'Coleção Geek',
		image: geek,
		stripeMonthlyUrl: 'https://clkdmg.site/subscribe/geek-mensal',
		stripeTriMonthlyUrl: 'https://clkdmg.site/subscribe/geek-trimestral',
		stripeSemiAnnualUrl: 'https://clkdmg.site/subscribe/geek-semestral',
		stripeAnnualUrl: 'https://clkdmg.site/subscribe/geek-anual'
	},
	{
		id: 'kids',
		name: 'Kids',
		description: 'Coleção Kids',
		image: kids,
		stripeMonthlyUrl: 'https://clkdmg.site/subscribe/kids-mensal',
		stripeTriMonthlyUrl: 'https://clkdmg.site/subscribe/kids-trimestral',
		stripeSemiAnnualUrl: 'https://clkdmg.site/subscribe/kids-semestral',
		stripeAnnualUrl: 'https://clkdmg.site/subscribe/kids-anual'
	},
	{
		id: 'arte',
		name: 'Arte',
		description: 'Coleção Arte',
		image: arte,
		stripeMonthlyUrl: 'https://clkdmg.site/subscribe/arte-mensal',
		stripeTriMonthlyUrl: 'https://clkdmg.site/subscribe/arte-trimestral',
		stripeSemiAnnualUrl: 'https://clkdmg.site/subscribe/arte-semestral',
		stripeAnnualUrl: 'https://clkdmg.site/subscribe/arte-anual'
	}
] as Collection[];

export const prices = [
	{
		id: 'anual',
		price: 'R$ 89,99'
	},
	{
		id: 'semestral',
		price: 'R$ 94,99'
	},
	{
		id: 'trimestral',
		price: 'R$ 99,99'
	},
	{
		id: 'mensal',
		price: 'R$ 109,99'
	}
] as Price[];

export type Price = {
	id: string;
	price: string;
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
