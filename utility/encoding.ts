const bcrypt = require("bcrypt");

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    return hashedPassword;
  } catch (e) {
    return console.error(e);
  }
};
