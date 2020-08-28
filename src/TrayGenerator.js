const { Tray, Menu, shell } = require('electron');
const path = require('path');


function TrayGenerator(mainWindow, store){
    this.tray = null;
    this.store = store;
    this.mainWindow = mainWindow;


    this.getWindowPosition = () => {
        const windowBounds = this.mainWindow.getBounds();
        const trayBounds = this.tray.getBounds();
        const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));
        const y = Math.round(trayBounds.y + trayBounds.height);
        return { x, y };
    };

    this.showWindow = () => {
        // const position = this.getWindowPosition();
        // this.mainWindow.setPosition(position.x, position.y, false);
        this.mainWindow.show();
        this.mainWindow.setVisibleOnAllWorkspaces(true);
        this.mainWindow.focus();
        this.mainWindow.setVisibleOnAllWorkspaces(false);
    };

    this.toggleWindow = () => {
        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            this.showWindow();
        }
        
    };

    this.rightClickMenu = () => {
        const menu = [
            {
                label:'Open Watchtower',
                click: event => shell.openExternal("https://watchtoweer.paystack.co")
            },
            {
                label:'Finance',
                submenu:[
                    {
                        label:'Support request',
                        click: event => shell.openExternal("https://docs.google.com/forms/d/e/1FAIpQLScwhpvE2PjhX3Ja7gVkdlSpCtVatbY8jbiIu7dHPzhzU0xQlA/viewform?usp=sf_link")
                    },
                    {
                        label:'Expense bot',
                        click: event => shell.openExternal("https://docs.google.com/forms/d/e/1FAIpQLSfCTjyMIVwRotxqknvQ12roLxrdMUkHvpWGr0XpvnVIGpvlfQ/viewform")
                    }
                ]
               
            },
            { label: 'Separator',       type: 'separator'},
            {
                label: 'Launch at startup',
                type: 'checkbox',
                checked: this.store.get('launchAtStart'),
                click: event => this.store.set('launchAtStart', event.checked),
            },
          
            {
                role: 'quit',
                accelerator: 'Command+Q'
            }
        ];
        this.tray.popUpContextMenu(Menu.buildFromTemplate(menu));
    }

    this.createTray = () => {
        this.tray = new Tray(path.join(__dirname, './assets/IconTemplate.png'));
        this.tray.setIgnoreDoubleClickEvents(true);
        this.tray.on('click', this.rightClickMenu);
        this.tray.on('right-click', this.rightClickMenu);
        
    };
}

module.exports= TrayGenerator;