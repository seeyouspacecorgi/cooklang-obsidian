import units from './units';
import en from './en';
import fr from './fr';
import it from './it';

const app_locale = () => window.localStorage.getItem('language');
const supported_locales: { [key: string]: Partial<typeof en> } = { en, fr, it };

export default class I18n {
	user_locale: string;
	locale: Partial<typeof en>;

	constructor(user_locale?: string) {
		// if no locale is given to the constructor, default to app locale
		this.user_locale = user_locale || app_locale();
		// if the locale isn't supported, use english
		this.locale = supported_locales[this.user_locale] || en;
	}

	// Main localization function
	translate(str: keyof typeof en, inserts?: { [key: string]: string }): string  {
		// Try to match the string to the translation file, fallback on english and if all fails display the string
		let translation = this.locale?.[str] ?? en?.[str] ?? `String missing: ${str}`;
		// Replace placeholders with values
		if (inserts) {
			for (const [key, value] of Object.entries(inserts)) {
		  	translation = translation.replace(`{{${key}}}`, value);
			}
		}
		return translation;
	}

	// Translate localized units into english
	units(unit: string): string {
		// Try to find a matching unit using the locale
		let strd_unit = Object.entries(units[this.user_locale]||{})?.find(([key, value]) => value.includes(unit))?.[0];
		if (strd_unit) return strd_unit;
		// Fallback to browse units across all languages
		return Object.entries(supported_units)?.find(([key, value]) => value.includes(unit))?.[0];
	}
}

const supported_units = Object.values(units).reduce((res, obj) => {
	for (const key in obj) {
		res[key] = [...new Set([...(res[key]||[]), ...obj[key]])];
	}
	return res;
}, {});
