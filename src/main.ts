import './styles.scss';
import { Plugin, WorkspaceLeaf, TFolder, addIcon } from 'obsidian';
import './lib/codemirror';
import './mode/cook/cook';
import { CookView } from './cookView';
import { CookLangSettings, CookSettingsTab } from './settings';
import I18n from './locales/locales';

export default class CookPlugin extends Plugin {

  settings: CookLangSettings;
  i18n: I18n;

  async onload() {
    super.onload();
    this.settings = Object.assign(new CookLangSettings(), await this.loadData());
    this.i18n = new I18n();

    // register a custom icon
    this.addDocumentIcon("cook");

    // register the view and extensions
    this.registerView("cook", this.cookViewCreator);
    this.registerExtensions(["cook"], "cook");

    this.addSettingTab(new CookSettingsTab(this.app, this));

    // commands:
    // - Create new recipe
    // - Create recipe in new pane
    // - Convert markdown file to `.cook`

    this.addCommand({
      id: "create-cook",
      name: this.i18n.translate("action-create-recipe"),
      callback: async () => {
        const newFile = await this.cookFileCreator();
        this.app.workspace.getLeaf().openFile(newFile);
      }
    })

    this.addCommand({
      id: "create-cook-new-pane",
      name: this.i18n.translate("action-create-recipe-in-new-pane"),
      callback: async () => {
        const newFile = await this.cookFileCreator();
        await this.app.workspace.getLeaf(true).openFile(newFile);
      }
    })

    // register the convert to cook command
    this.addCommand({
      id: "convert-to-cook",
      name: this.i18n.translate("action-convert-md-to-cook"),
      checkCallback: (checking:boolean) => {
        const file = this.app.workspace.getActiveFile();
        const isMd = file && file.extension === "md";
        if(checking) {
          return isMd;
        }
        else if(isMd) {
          // replace last instance of .md with .cook
          this.app.vault.rename(file, file.path.replace(/\.md$/, ".cook")).then(() => {
            this.app.workspace.activeLeaf.openFile(file);
          }).catch(() => new Notice(this.i18n.translate("msg-file-already-exists")));
        }
      }
    })

    // context menu:
    // - Create new recipe
    // - Convert markdown file to `.cook`

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        // option only shows on folders
        if(file instanceof TFolder) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.translate("action-create-recipe"))
                .setIcon("document-cook")
                .onClick(async () => {
                  const newFile = await this.cookFileCreator(file.path);
                  this.app.workspace.getLeaf().openFile(newFile);
              })
          })
        }
        // option only shows on markdown files
        if(file.extension === "md") {
          menu.addItem((item) => {
             item.setTitle(this.i18n.translate("action-convert-md-to-cook"))
                 .setIcon("document-cook")
                 .onClick(() => {
                   this.app.vault.rename(file, file.path.replace(/\.md$/, ".cook")).then(() => {
                     this.app.workspace.getLeaf().openFile(file);
                   }).catch(() => new Notice(this.i18n.translate("msg-file-already-exists")));
               })
           })
        }
      })
    )
  }

  cookFileCreator = async (newFileFolderPath?: string) => {
    if(!newFileFolderPath) {
      const newFileLocation = (this.app.vault as any).getConfig('newFileLocation');
      if(newFileLocation === 'current') {
        newFileFolderPath = this.app.workspace.getActiveFile()?.parent?.path;
      }
      else if(newFileLocation === 'folder') {
        newFileFolderPath = (this.app.vault as any).getConfig('newFileFolderPath');
      }
      else {
        newFileFolderPath = '/';
      }
    }

    if(!newFileFolderPath.endsWith('/')) newFileFolderPath += '/';

    const originalPath = newFileFolderPath;
    newFileFolderPath = `${newFileFolderPath}${this.i18n.translate('label-untitled-file')}.cook`;
    let i = 0;
    while(this.app.vault.getAbstractFileByPath(newFileFolderPath.replace(/^\//, ''))) {
      newFileFolderPath = `${originalPath}${this.i18n.translate('label-untitled-file')} ${++i}.cook`;
    }
    const newFile = await this.app.vault.create(newFileFolderPath, '');
    return newFile;
  }

  // function to create the view
  cookViewCreator = (leaf: WorkspaceLeaf) => {
    return new CookView(leaf, this.settings);
  }

  reloadCookViews() {
    this.app.workspace.getLeavesOfType('cook').forEach(leaf => {
      if(leaf.view instanceof CookView) {
        leaf.view.settings = this.settings;
        if(leaf.view.recipe) leaf.view.renderPreview(leaf.view.recipe);
      }
    });
  }

  // this function provides the icon for the document
  // I added a modification of the CookLang icon with no colours or shadows
  addDocumentIcon = (extension: string) => {
    addIcon(`document-${extension}`, `
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 48C39.9411 48 48 39.9411 48 30H12C12 39.9411 20.0589 48 30 48Z" fill="currentColor"/>
    <circle cx="18" cy="18" r="4" fill="currentColor"/>
    <circle cx="42" cy="18" r="4" fill="currentColor"/>
    <circle cx="30" cy="16" r="4" fill="currentColor"/>
    </svg>
    `);
  }
}
