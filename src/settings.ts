import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { CookView } from './cookView';

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
      .setName(this.plugin.i18n.translate('section-preview'))
      .setHeading();

    new Setting(containerEl)
      .setName(this.plugin.i18n.translate('option-show-images'))
      .setDesc(this.plugin.i18n.translate('option-show-images-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showImages)
        .onChange((value: boolean) => {
          this.plugin.settings.showImages = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(this.plugin.i18n.translate('option-show-metadata'))
      .setDesc(this.plugin.i18n.translate('option-show-metadata-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showMetadata)
        .onChange((value: boolean) => {
          this.plugin.settings.showMetadata = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(this.plugin.i18n.translate('option-show-ingredients'))
      .setDesc(this.plugin.i18n.translate('option-show-ingredients-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showIngredientList)
        .onChange((value: boolean) => {
          this.plugin.settings.showIngredientList = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(this.plugin.i18n.translate('option-show-cookware'))
      .setDesc(this.plugin.i18n.translate('option-show-cookware-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showCookwareList)
        .onChange((value: boolean) => {
          this.plugin.settings.showCookwareList = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(this.plugin.i18n.translate('option-inline-quantities'))
      .setDesc(this.plugin.i18n.translate('option-inline-quantities-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showQuantitiesInline)
        .onChange((value: boolean) => {
          this.plugin.settings.showQuantitiesInline = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(this.plugin.i18n.translate('option-show-timers'))
      .setDesc(this.plugin.i18n.translate('option-show-timers-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showTimersList)
        .onChange((value: boolean) => {
          this.plugin.settings.showTimersList = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(this.plugin.i18n.translate('option-interactive-timers'))
      .setDesc(this.plugin.i18n.translate('option-interactive-timers-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showTimersInline)
        .onChange((value: boolean) => {
          this.plugin.settings.showTimersInline = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(this.plugin.i18n.translate('option-show-totaltime'))
      .setDesc(this.plugin.i18n.translate('option-show-totaltime-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.showTotalTime)
        .onChange((value: boolean) => {
          this.plugin.settings.showTotalTime = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(this.plugin.i18n.translate('option-timer-sound'))
      .setDesc(this.plugin.i18n.translate('option-timer-sound-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.timersTick)
        .onChange((value: boolean) => {
          this.plugin.settings.timersTick = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));

    new Setting(containerEl)
      .setName(this.plugin.i18n.translate('option-alarm-sound'))
      .setDesc(this.plugin.i18n.translate('option-alarm-sound-description'))
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.timersRing)
        .onChange((value: boolean) => {
          this.plugin.settings.timersRing = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.reloadCookViews();
        }));
  }
}
