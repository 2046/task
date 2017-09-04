import { extname } from 'path'
import { writeFile, readFile } from 'fs'
import { app, Menu, dialog } from 'electron'
import { dbFilePath } from '../conf/constants'

export default class {
    constructor(win) {
        let template, menu

        template = [
        {
            label: 'File',
            submenu: [
                this.newTodo(win),
                this.newTag(win),
                { type: 'separator' },
                this.importMenu(win),
                this.exportMenu(win),
                { type: 'separator' },
                this.aboutMenu(win),
                this.aboutQuit()
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                {role: 'pasteandmatchstyle'},
                {role: 'delete'},
                {role: 'selectall'}
            ]
        }]

        menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    }
    newTodo(win) {
        return {
            label: 'New Todo',
            accelerator: 'CommandOrControl+N',
            click: () => win.webContents.send('new_todo')
        }
    }
    newTag(win) {
        return {
            label: 'New Tag',
            accelerator: 'CommandOrControl+T',
            click: () => win.webContents.send('new_tag')
        }
    }
    importMenu(win) {
        return {
            label: 'Import',
            accelerator: 'CommandOrControl+Shift+I',
            click: () => importFile(win)
        }
    }
    exportMenu(win) {
        return {
            label: 'Export',
            accelerator: 'CommandOrControl+Shift+E',
            click: () => exportFile(win)
        }
    }
    aboutMenu(win) {
        return {
            label: 'About',
            click: () => showAbout(win)
        }
    }
    aboutQuit() {
        return {
            label: 'Quit',
            role: 'quit'
        }
    }
}

function showAbout(win) {
    dialog.showMessageBox({
        type: 'info',
        message: `${app.getName()}`,
        detail: `current Version: ${app.getVersion()}`
    })
}

function importFile(win, properties = ['openFile']) {
    dialog.showOpenDialog(win, { properties }, (filePaths) => {
        if (!filePaths) {
            return
        }

        let filePath = filePaths[0]
        
        if (!isJsonFile(filePath)) {
            return showImportErrorBox('The imported file does not meet the criteria')
        }

        readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                return showImportErrorBox(err.message)
            }

            try {
                let json = JSON.parse(content)

                if (!json.tags || !json.todos) {
                    throw new Error('The imported file does not meet the criteria')
                }
            } catch(err) {
                showImportErrorBox(err.message)
            }

            writeFile(dbFilePath, content, (err) => {
                if (err) {
                    return showImportErrorBox(err.message)
                }

                win.reload()
            })
        })
    })
}

function exportFile(win) {
    dialog.showSaveDialog(win, {}, (filePath) => {
        if (!filePath) {
            return
        }

        if (!isJsonFile(filePath)) {
            return showExportErrorBox('The exported file does not meet the criteria')
        }

        readFile(dbFilePath, 'utf8', (err, content) => {
            if (err) {
                return showExportErrorBox(err.message)
            }

            writeFile(filePath, content, (err) => {
                if (err) {
                    return showExportErrorBox(err.message)
                }

                dialog.showMessageBox({
                    type: 'info',
                    message: 'Export success!'
                })
            })
        })
    })
}

function isJsonFile(filePath) {
    return extname(filePath) === '.json'
}

function showImportErrorBox(detail) {
    dialog.showErrorBox('Import error', detail)
}

function showExportErrorBox(detail) {
    dialog.showErrorBox('Export error', detail)
}