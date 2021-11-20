import { readable } from 'svelte/store'
import type { Readable } from 'svelte/store'
import type { GenericText } from '../i18n/generic'
import { englishText } from '../i18n/en'
import { browser } from '$app/env'
import { frenchText } from '../i18n/fr'

function getTranslatedText() {
	if (browser) {
		switch (navigator.language) {
			case 'en':
				return englishText
			default:
				return frenchText
		}
	}
	return frenchText
}

export const translatedText: Readable<GenericText> = readable(getTranslatedText())