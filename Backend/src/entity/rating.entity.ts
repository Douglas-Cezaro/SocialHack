import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./user.entity";
import Establishment from "./establishment.entity";

@Entity("ratings")
export default class Rating {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  value: number;

  @Column()
  opinion: string;
  @ManyToOne(() => User, (user) => user.ratings, {
    cascade: ["insert", "update"],
  })
  user: User;

  @ManyToOne(() => Establishment, (establishment) => establishment.ratings, {
    cascade: ["insert", "update"],
  })
  establishment: Establishment;
}
