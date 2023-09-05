const { ipcRenderer } = require('electron');

// TEST PRINT FUNCTIONALITY
document.getElementById('test-button').addEventListener('click', testConsoleLog);

function testConsoleLog() {
    ipcRenderer.send('console-log', "test");
}

ipcRenderer.on('test-console-log-result', (event, result) => {
    if (result === 'success') {
        alert("successfully logged to native console!");
    } else if (result === 'error') {
        alert("unsuccessfully logged to native console...");
    }
});

// SAVE BUTTON FUNCTIONALITY
document.getElementById('save-button').addEventListener('click', saveTextToFile);

function saveTextToFile() {
    const text = document.getElementById('editor').value;
    ipcRenderer.send('save-text', text);
}

ipcRenderer.on('save-result', (event, result) => {
    if (result === 'success') {
        alert("File saved successfully!");
    } else if (result === 'error') {
        alert("An error occurred while saving the file.");
    }
});
