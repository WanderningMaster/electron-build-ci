// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const log = require('electron-log/main')

log.initialize({
	spyRendererConsole: true,
})
const logPath = path.join(app.getPath('appData'), 'logs/main.log')
console.log('log path: ', logPath)
log.transports.file.resolvePathFn = () => logPath;
Object.assign(console, log.functions)

process.on('uncaughtException', (err) => {
	log.error(err)
}) 
function createWindow () {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			devTools: true, 
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true,
		}
	})

	mainWindow.loadFile('index.html')

	mainWindow.on("ready-to-show", () => {
		mainWindow.webContents.openDevTools({
			mode: 'detach',
		})
	})
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
