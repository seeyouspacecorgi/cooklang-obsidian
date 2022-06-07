# CookLang Editor Obsidian Plugin
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/deathau/cooklang-obsidian?style=for-the-badge&sort=semver)](https://github.com/deathau/cooklang-obsidian/releases/latest)
![GitHub All Releases](https://img.shields.io/github/downloads/deathau/cooklang-obsidian/total?style=for-the-badge)

A plugin for [Obsidian](https://obsidian.md) adding support for [CookLang](https://cooklang.org)

![Screenshot](https://github.com/deathau/cooklang-obsidian/raw/main/screenshot.png)

## Installation
- This plugin has been submitted community plugins repo. You can install it from Communinty Plugins within Obsidian.
- You can build and install the plugin manually by checking out the files to `<your vault>/.obsidian/plugins/cooklang-obsidian` and running `npm install` and then `npm run build`.

## Localization
### How to add a translation
To translate, [fork this repo](https://guides.github.com/activities/forking/) and find the `src/locales` folder.

If the language you want to translate already exists in that folder, you can simply edit the values:  
original    =>  `'action-create-recipe': 'Create new recipe',`  
translated  =>  `'action-create-recipe': 'Créer une nouvelle recette',`

In case the file does not exists, duplicate `en.ts` and rename it before editing. Then open `locale.ts`, import your language file and add it to the list of supported locales:

```
import en from './en';
import fr from './fr';
import <your-language> from './<your-language>';

const locale = () => window.localStorage.getItem('language');
const supported_locales: { [k: string]: Partial<typeof en> } = { en, fr, <your-language> };
```

Once you're done editing, [submit a pull request](https://guides.github.com/activities/forking/).

For translation consistency with Obsidian and other plugins, check out [obsidian-translations](https://github.com/obsidianmd/obsidian-translations)

### List of translated languages

| Language code | Language name | Native name           | Translation           
| ------------- | ------------- | --------------------- | --------------------- 
| `en`          | English       | English               | (original)            
| `fr`          | French        | français              | [@seeyouspacecorgi](https://github.com/seeyouspacecorgi)
| `it`          | Italian       | Italiano              | thanks [@savissimo](https://github.com/savissimo) !


## Security
> Third-party plugins can access files on your computer, connect to the internet, and even install additional programs.

The source code of this plugin is available on GitHub for you to audit yourself, but installing plugins into Obsidian is a matter of trust.

I can assure you here that I do nothing to collect your data, send information to the internet or otherwise do anything nefarious with your system. However, be aware that I *could*, and without auditing the code yourself, you only have my word that I don't.

## Support me
This is an open-source plugin I made *for fun*. It's completely free.
However, if you absolutely *have* to send me money because you like it that
much, feel free to throw some coins in my hat via the following:

[![GitHub Sponsors](https://img.shields.io/github/sponsors/deathau?style=social)](https://github.com/sponsors/deathau)
[![Paypal](https://img.shields.io/badge/paypal-deathau-yellow?style=social&logo=paypal)](https://paypal.me/deathau)

# Roadmap
This is the stuff I would ideally like to include in this plugin that isn't available as yet:
- [x] Improve editor/preview mode buttons to be more like markdown
- [x] Command to convert `.md` to `.cook`
    - [ ] Maybe also `cook` code block support?
- [x] Include option for showing quantities inline in the method
    - [ ] Option to link between ingredients and method?
- [x] Include options for showing ingredients list, tools list and time
    - [x] (calculate total time)
- [ ] Unit conversion (metric <-> imperial)
- [ ] Scaling up/down (check spec)
- [ ] Shopping list and `.conf` file support (needs designing)
- [ ] Better metadata support.
    - [ ] Making source links clickable.
    - [ ] Support for Obsidian tagging.
- [ ] (Maybe, pending feedback) Markdown formatting support.

# Version History
## 0.3.0
- Separated out the CookLang parsing code into its own library, and brought it up to date with the latest CookLang spec (so things like named timers are now supported properly)
- Added more options for displaying timers
- Added the ability to click on a timer and show a countdown
    - it also optionally plays a sound while the timer is running and when it's finished
    - This feature is still pretty new and probably needs more testing

## 0.2.0
- Changed comment syntax according to spec changes

## 0.1.1
- **Fixed:** Turning off inline measurements now actually removes all of them.
- **New:** Added commands to add new recipe files.

## 0.1.0
- Improve editor/preview mode buttons to be more like markdown views
    - You can even ctrl/cmd click to open in new pane!
- Include options for showing ingredients list, tools list and time
- Include option for showing quantities inline in the method

## 0.0.4
- Command to convert `.md` to `.cook`

## 0.0.3
- Fixes an issue preventing preview mode from working if no image is present

## 0.0.1
Initial release!
- You can open and edit `.cook` files
- There is an edit view with syntax highlighting
- There is also a preview view which displays the ingredients and amounts at the top like a traditional recipe
and numbers the steps.
- If images are provided (as per the [CookLang convention](https://cooklang.org/docs/spec/#adding-pictures) ) they will also be displayed.
