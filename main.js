const { app, BrowserWindow, ipcMain, dialog } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })


    win.loadFile('index.html');
    win.openDevTools();

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('save-text', async (event, text) => {
    const { filePath } = await dialog.showSaveDialog({
        title: 'Save text file',
        defaultPath: app.getPath('documents') + '/untitled.txt',
        filters: [{ name: 'Text Files', extensions: ['txt'] }]
    });

    if (filePath) {
        fs.writeFile(filePath, text, (err) => {
            if (err) {
                console.error("There was an error writing the file:", err);
                event.reply('save-result', 'error');
            } else {
                event.reply('save-result', 'success');
            }
        });
    } else {
        event.reply('save-result', 'canceled');
    }
});

ipcMain.on('console-log', async (event, text) => {
    console.log(text);
})