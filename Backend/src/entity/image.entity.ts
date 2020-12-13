import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Establishment from "./establishment.entity";
@Entity("images")
export default class Image {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Establishment, (establishment) => establishment.images, {
    cascade: ["insert", "update"],
  })
  establishment: Establishment;
}
