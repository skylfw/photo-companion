import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "sky@launch.com",
        username: "sky",
        password: "123",
      },
    ];

    for (const user of usersData) {
      const currentUser = await User.query().findOne({ email: user.email });
      if (!currentUser) {
        await User.query().insert(user);
      }
    }
  }
}

export default UserSeeder;
