// import the webdriver and the high level browser wrapper
import assert from "assert";
import {
  NotificationType,
  NotificationsCenter,
  VSBrowser,
  WebDriver,
  Workbench,
} from "vscode-extension-tester";

// Create a Mocha suite
describe("My Test Suite", () => {
  let center: NotificationsCenter;

  before(async () => {
    center = await new Workbench().openNotificationsCenter();
  });

  after(async () => {
    await center.close();
  });

  it("getNotifications works", async function () {
    this.timeout(100000);
    await new Workbench().executeCommand("Hello World");
    await center.getDriver().sleep(500);
    center = await new Workbench().openNotificationsCenter();
    await center.getDriver().sleep(500);
    const notifications = await center.getNotifications(NotificationType.Any);
    assert.ok(notifications.length > 0);
  });
});
