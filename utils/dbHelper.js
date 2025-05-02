const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

// Create Admin User
async function createAdminUserOnDB(userName, plainPassword) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "orangehrm",
    port: 3306,
  });

  try {
    // Verify if emp_number exists before inserting
    const [empCheck] = await connection.execute(
      "SELECT * FROM hs_hr_employee WHERE emp_number = ?",
      [2]
    );

    if (empCheck.length === 0) {
      console.error("Error: emp_number 2 does not exist in hs_hr_employee");
      return;
    }

    // Hash the password correctly with bcrypt
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    // Insert new admin user with bcrypt-hashed password
    await connection.execute(
      `
      INSERT INTO ohrm_user (user_role_id, emp_number, user_name, user_password, deleted, status, date_entered)
      VALUES (?, ?, ?, ?, ?, ?, NOW());
      `,
      [1, 2, userName, hashedPassword, 0, 1]
    );

    console.log(`Successfully created admin user on DB: ${userName}`);
  } catch (error) {
    console.error("Database error:", error.message);
  } finally {
    await connection.end();
  }
}

// 🗑 Delete Admin User
async function deleteAdminUserOnDB(userName) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "orangehrm",
    port: 3306,
  });

  try {
    // Verify if the user exists before deleting
    const [userCheck] = await connection.execute(
      "SELECT * FROM ohrm_user WHERE user_name = ?",
      [userName]
    );

    if (userCheck.length === 0) {
      console.error(`🚨 Error: User '${userName}' does not exist in ohrm_user`);
      return;
    }

    // Delete the user
    await connection.execute("DELETE FROM ohrm_user WHERE user_name = ?", [userName]);

    console.log(`Successfully deleted user on DB: ${userName}`);
  } catch (error) {
    console.error("🚨 Database error:", error.message);
  } finally {
    await connection.end();
  }
}

module.exports = { createAdminUserOnDB, deleteAdminUserOnDB };
