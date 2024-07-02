window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

const rustLib = require('hi-rust')
const { contextBridge } = require('electron')
contextBridge.exposeInMainWorld('rustLib', {
	read_file: rustLib.read_file,
	fib: rustLib.fibonacci, 
})

