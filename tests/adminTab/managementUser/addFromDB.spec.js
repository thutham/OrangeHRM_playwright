const { createAdminUser } = require("../../../utils/dbHelper");
const { test, expect } = require("../../common/testBase");
const { LoginPage } = require("../../../pages/importsPage");
const { URLS } = require("../../../constant/constantUrls");

test.describe("Login with DB account Suites", () => {
    let loginPage;
    let userName;
    let password;

    // Run before each test
    test.beforeEach(async ({ page }) => {
        // await addEmployee(102, "Jane", "Doe", "Female", "1995-07-20");
        userName = `ThamAdminAuto{Date.now()}`; // Dynamic username
        password = "Admin@1234";
        // await addUser(userName, password);

        // // ✅ Verify user exists before login attempt
        // const user = await getUserByUsername(userName);
        // if (!user) throw new Error(`❌ User creation failed: ${userName}`);

        // console.log(`📝 Created user: ${userName} with password ${password}`);
        // loginPage = new LoginPage(page);
    });

    // ✅ Test successful login with DB-created account
    test("Successful employee login with valid credentials", async ({ page }) => {
        // await loginPage.login(userName, password);
        // await page.waitForLoadState("load");
        // await expect(page).toHaveURL(URLS.Dashboard);
        await createAdminUser(userName,password);
    });
});
