import bcrypt from "bcrypt";

const run = async () => {
  console.log("admin123 =", await bcrypt.hash("admin123", 10));
  console.log("user123 =", await bcrypt.hash("user123", 10));
  console.log("superadmin123 =", await bcrypt.hash("superadmin123", 10));
};

run();
