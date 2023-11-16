/* eslint-disable no-console */
import { connection } from "../boot.js";
import CollectionSeeder from "./seeders/CollectionSeeder.js";
import PhotoSeeder from "./seeders/PhotoSeeder.js";
import UserSeeder from "./seeders/UserSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("seeding users...");
    await UserSeeder.seed();

    console.log("seeding collections...");
    await CollectionSeeder.seed();

    console.log("seeding photos...");
    await PhotoSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
