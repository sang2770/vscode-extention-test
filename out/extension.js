"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const cats = {
    'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    let currentPanel = undefined;
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "web-view" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('web-view.start', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        if (currentPanel) {
            currentPanel.reveal(vscode.ViewColumn.One);
            return;
        }
        vscode.window.showInformationMessage('Hello World from web-view!');
        const panel = vscode.window.createWebviewPanel('CatCoding', 'Cat Coding', vscode.ViewColumn.One, {
            enableScripts: true
        });
        currentPanel = panel;
        let iteration = 0;
        // const updateVebView = () => {
        // 	const cat = iteration++ % 2 === 0 ? 'Coding Cat' : 'Compiling Cat';
        // 	panel.title = cat;
        // 	panel.webview.html = getWebviewContent(cat);
        // }
        // updateVebView();
        // const interval = setInterval(updateVebView, 1000);
        panel.webview.html = getWebviewContent();
        panel.onDidDispose(() => {
            // clearInterval(interval);
        }, null, context.subscriptions);
        panel.webview.onDidReceiveMessage(message => {
            console.log(message);
            switch (message.command) {
                case 'alert':
                    vscode.window.showErrorMessage(message.text);
                    return;
            }
        }, undefined, context.subscriptions);
        panel.onDidChangeViewState(e => {
            const panel = e.webviewPanel;
            console.log(panel.viewColumn);
            switch (panel.viewColumn) {
                case vscode.ViewColumn.One:
                    panel.webview.html = getWebviewContent('Coding Cat');
                    return;
                case vscode.ViewColumn.Two:
                    panel.webview.html = getWebviewContent('Compiling Cat');
                    return;
            }
        }, null, context.subscriptions);
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(vscode.commands.registerCommand('web-view.doRefactor', () => {
        if (!currentPanel) {
            return;
        }
        currentPanel.webview.postMessage({ command: 'refactor' });
    }));
    context.subscriptions.push(vscode.commands.registerCommand('web-view.helloWord', () => {
        vscode.window.showInformationMessage('Hello World!');
    }));
}
exports.activate = activate;
function getWebviewContent(cat = 'Coding Cat') {
    return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Cat Coding</title>
	</head>
	<body>
		<img src="${cats[cat]}" width="300" />
		<div id="lines-of-code-counter"></div>
		<script>
        const counter = document.getElementById('lines-of-code-counter');
		const vscode = acquireVsCodeApi();
        let count = 0;
        setInterval(() => {
            counter.textContent = count++;
			if (Math.random() < 0.001 * count) {
				vscode.postMessage({
					command: 'alert',
					text: '🐛  on line ' + count
				})
			}
        }, 100);

        // Handle the message inside the webview
        window.addEventListener('message', event => {

            const message = event.data; // The JSON data our extension sent

            switch (message.command) {
                case 'refactor':
                    count = Math.ceil(count * 0.5);
                    counter.textContent = count;
                    break;
            }
        });
    </script>
	</body>
	</html>`;
}
;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map