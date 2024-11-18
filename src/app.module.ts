import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "src/tasks/models/task.model";
import { TasksModule } from "src/tasks/tasks.module";
import { UsersModule } from "./users/users.module";
import { User } from "src/users/models/user.model";
import { JwtModule } from "@nestjs/jwt";
import "dotenv/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Task, User],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}
