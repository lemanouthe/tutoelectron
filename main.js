const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let win; 

function createWindow(){
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true, // is default value after Electron v5
        },
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    win.maximize()
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });

}

app.on('ready', createWindow);

// Fermerture de l'application
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

// Ouver ture de l'application
app.on('activate', () => {
    if (win === null){
        createWindow()
    }
})
app.allowRendererProcessReuse = true;