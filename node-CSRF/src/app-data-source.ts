import { DataSource } from "typeorm"
import { User } from "./entity/user"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456",
  database: "testing",
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
})