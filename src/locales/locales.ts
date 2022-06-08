// Based on https://github.com/valentine195/obsidian-leaflet-plugin/blob/master/src/l10n/locale.ts
import units from './units';
import en from './en';
import fr from './fr';
import it from './it';

const locale = () => window.localStorage.getItem('language');
const supported_locales: { [k: string]: Partial<typeof en> } = { en, fr, it };
const user_locale = supported_locales[locale()];

const i18n = (str: keyof typeof en, inserts?: { [k: string]: string }): string => {
	// Fallback on english if the language isn't supported, failing that it'll return the original string
	let local_str = user_locale?.[str] ?? en?.[str] ?? str;
	// Replace placeholders with values
	if (inserts) {
		for (const [key, value] of Object.entries(inserts)) {
	  	local_str = local_str.replace(`{{${key}}}`, value);
		}
	}
	return local_str;
}

// Convert localized units into a standard unit name
export const i18n_units = (unit: string) => {
	// Try to find a matching unit using the locale
	let strd_unit = Object.entries(units[user_locale]||{})?.find(([key, value]) => value.includes(unit))?.[0];
	if (strd_unit) return strd_unit;
	// Fallback to browse units across all languages
	return Object.entries(supported_units)?.find(([key, value]) => value.includes(unit))?.[0];
}

const supported_units = Object.values(units).reduce((res, obj) => {
	for (const key in obj) {
		res[key] = [...new Set([...(res[key]||[]), ...obj[key]])];
	}
	return res;
}, {});

export default i18n;
