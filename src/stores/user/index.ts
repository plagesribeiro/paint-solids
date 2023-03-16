import { onAuthStateChanged } from 'firebase/auth';

import { readable, writable } from 'svelte/store';
import {
	getDoc,
	doc,
	setDoc,
	DocumentSnapshot,
	type DocumentData
} from 'firebase/firestore';
import { auth, db } from 'stores/firebase';

type StoreUserData = {
	name?: string | null;
	email?: string | null;
	phone?: string | null;
	photoUrl?: string | null;
	subscriptions?: string[];
	user?: any;
	loggedIn: boolean;
};

type DbUserData = {
	email: string | null;
	subscriptions: string[];
	name?: string | null;
	phone?: string | null;
};

export const userData = writable<StoreUserData>({
	loggedIn: false
});

export const userDoc = readable<DocumentSnapshot<DocumentData> | undefined>(
	undefined,
	(set) => {
		if (!auth) {
			return undefined;
		}

		return onAuthStateChanged(auth, async (user) => {
			if (user) {
				let dataToSetToStore: DbUserData | DocumentData;

				const docRef = doc(db, 'users', user.uid);
				const docSnap = await getDoc(docRef);

				if (!docSnap.exists()) {
					// Creates user
					const userRef = doc(db, 'users', user.uid);

					dataToSetToStore = {
						email: user.email,
						subscriptions: []
					};
					await setDoc(userRef, dataToSetToStore, { merge: true });
				} else {
					// Fech user
					const userData = docSnap.data();
					dataToSetToStore = userData;
				}

				userData.update(() => {
					return {
						email: user.email,
						photoUrl: user.photoURL,
						name: dataToSetToStore.name,
						phone: dataToSetToStore.phone,
						subscriptions: dataToSetToStore.subscriptions,
						user: user,
						loggedIn: true
					};
				});
			} else {
				userData.update(() => {
					return {
						loggedIn: false
					};
				});
			}
		});
	}
);
