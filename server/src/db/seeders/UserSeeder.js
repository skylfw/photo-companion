import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "sky@launch.com",
        username: "sky",
        password: "123",
        location: "Boston, MA",
      },
      {
        email: "s@123.com",
        username: "s",
        password: "123",
        location: "Boston, MA",
        expertise: "portraits",
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
