"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import the webdriver and the high level browser wrapper
const assert_1 = __importDefault(require("assert"));
const vscode_extension_tester_1 = require("vscode-extension-tester");
// Create a Mocha suite
describe("My Test Suite", () => {
    let center;
    before(async () => {
        center = await new vscode_extension_tester_1.Workbench().openNotificationsCenter();
    });
    after(async () => {
        await center.close();
    });
    it("getNotifications works", async function () {
        this.timeout(100000);
        await new vscode_extension_tester_1.Workbench().executeCommand("Hello World");
        await center.getDriver().sleep(500);
        center = await new vscode_extension_tester_1.Workbench().openNotificationsCenter();
        await center.getDriver().sleep(500);
        const notifications = await center.getNotifications(vscode_extension_tester_1.NotificationType.Any);
        assert_1.default.ok(notifications.length > 0);
    });
});
//# sourceMappingURL=ui-test.test.js.map