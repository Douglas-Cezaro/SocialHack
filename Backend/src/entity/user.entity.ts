import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import Rating from "./rating.entity";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true })
  contact: string;

  @OneToMany(() => Rating, (rating) => rating.user, {
    cascade: ["insert", "update"],
  })
  ratings: Rating[];
}
