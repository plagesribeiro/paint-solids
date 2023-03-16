import { Stripe } from 'stripe';
import { readable } from 'svelte/store';

export const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
	apiVersion: '2022-11-15'
});

// create readable store with all products
export const products = readable<Stripe.Product[]>(undefined, (set) => {
	stripe.products.list().then((products) => {
		set(products.data);
		return products;
	});
});
