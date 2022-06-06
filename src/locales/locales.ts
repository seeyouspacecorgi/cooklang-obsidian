//Based on https://github.com/valentine195/obsidian-leaflet-plugin/blob/master/src/l10n/locale.ts
import en from './en';
import fr from './fr';
import it from './it';

const locale = () => window.localStorage.getItem('language');
const supported_locales: { [k: string]: Partial<typeof en> } = { en, fr, it };
const user_locale = supported_locales[locale()];

export default function i18n(str: keyof typeof en, inserts?: { [k: string]: string }): string {
	//Fallback on english if the language isn't supported, failing that it'll return the original string
	let local_str = user_locale?.[str] ?? en?.[str] ?? str;
	//Replace placeholders with values
	if (inserts) {
		for (const [key, value] of Object.entries(inserts)) {
	  	local_str = local_str.replace(`{{${key}}}`, value);
		}
	}
	return local_str;
}
