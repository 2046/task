import Menu from './menu'
import { app, BrowserWindow } from 'electron'
import { isDev, isMacOS, url } from '../conf/constants'
import { closeResizeable, closeFullScreenable, closePageRefreshable, closeMaximizable, installExtension } from '../utils'

let win

function createWindow() {
    win = new BrowserWindow({
        width: 650,
        height: 498,
        useContentSize: true
    })

    if (isDev) {
        installExtension()
        win.webContents.openDevTools()
    }

    win.loadURL(url)
    closeResizeable(win)
    closeMaximizable(win)
    closePageRefreshable()
    closeFullScreenable(win)

    win.on('closed', () => {
        win = null
    })
    
    new Menu(win)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (!isMacOS) {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})