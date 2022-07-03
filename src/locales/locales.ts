import units from './units';
import en from './en';
import fr from './fr';
import it from './it';

const supported_locales: { [key: string]: Partial<typeof en> } = { en, fr, it };

export default class I18n {
	locale_key: string;
	locale: Partial<typeof en>;

	constructor() {
		this.setLocale();
	}

	setLocale(str?: string) {
		// if no argument, will reset to app locale
		this.locale_key = str ?? window.localStorage.getItem('language');
		// if the locale isn't supported, use english
		this.locale = supported_locales[this.locale_key] || en;
	}

	// Main localization function
	translate(str: keyof typeof en, inserts?: { [key: string]: string }): string  {
		// Try to match the string to the translation file, fallback on english and if all fails display the string
		let translation = this.locale?.[str] ?? en?.[str] ?? `String missing: ${str}`;
		// Replace placeholders with values
		if (inserts) {
			for (const key in inserts) {
		  	translation = translation.replace(`{{${key}}}`, inserts[key]);
			}
		}
		return translation;
	}

	// Translate localized units into english
	getUnit(unit: string): string {
		// Try to find a matching unit using the locale
		const locale_units = units[this.locale_key];
		if (locale_units) {
			for (const key in locale_units) {
				if (locale_units[key].test(unit)) return key;
			}
		}
		// Try to find a matching unit in any language
		for (const lang in units) {
			for (const key in units[lang]) {
				if (units[lang][key].test(unit)) return key;
			}
		}
		return "";
	}
}
