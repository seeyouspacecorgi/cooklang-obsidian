import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { CookView } from './cookView';
import i18n from './locales/locales';

declare class CookPlugin extends Plugin {
  settings: CookLangSettings;
  reloadCookViews(): void;
}

export class CookLangSettings {
  showImages: boolean = true;
  showIngredientList: boolean = true;
  showCookwareList: boolean = true;
  showTimersList: boolean = false;
  showTotalTime: boolean = true;
  showTimersInline: boolean = true;
  showQuantitiesInline: boolean = false;
  timersTick: boolean = true;
  timersRing: boolean = true;
  showMetadata: boolean = false;
}

export class CookSettingsTab extends PluginSettingTab {
  plugin: CookPlugin;
  constructor(app: App, plugin: CookPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName(i18n('section-preview'))
      .setHeading();

    new Setting(containerEl)
      .setName(i18n('option-show-images'))
      .setDesc(i18n('option-show-images-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showImages)
        .onChange((value: boolean) => {
          this.plugin.settings.showImages = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(i18n('option-show-metadata'))
      .setDesc(i18n('option-show-metadata-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showMetadata)
        .onChange((value: boolean) => {
          this.plugin.settings.showMetadata = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(i18n('option-show-ingredients'))
      .setDesc(i18n('option-show-ingredients-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showIngredientList)
        .onChange((value: boolean) => {
          this.plugin.settings.showIngredientList = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(i18n('option-show-cookware'))
      .setDesc(i18n('option-show-cookware-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showCookwareList)
        .onChange((value: boolean) => {
          this.plugin.settings.showCookwareList = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(i18n('option-inline-quantities'))
      .setDesc(i18n('option-inline-quantities-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showQuantitiesInline)
        .onChange((value: boolean) => {
          this.plugin.settings.showQuantitiesInline = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(i18n('option-show-timers'))
      .setDesc(i18n('option-show-timers-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showTimersList)
        .onChange((value: boolean) => {
          this.plugin.settings.showTimersList = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(i18n('option-interactive-timers'))
      .setDesc(i18n('option-interactive-timers-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showTimersInline)
        .onChange((value: boolean) => {
          this.plugin.settings.showTimersInline = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(i18n('option-show-totaltime'))
      .setDesc(i18n('option-show-totaltime-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showTotalTime)
        .onChange((value: boolean) => {
          this.plugin.settings.showTotalTime = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(i18n('option-timer-sound'))
      .setDesc(i18n('option-timer-sound-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.timersTick)
        .onChange((value: boolean) => {
          this.plugin.settings.timersTick = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(i18n('option-alarm-sound'))
      .setDesc(i18n('option-alarm-sound-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.timersRing)
        .onChange((value: boolean) => {
          this.plugin.settings.timersRing = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));
  }
}
