import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Establishment from "./establishment.entity";

@Entity("types")
export default class Type {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Establishment, (establishment) => establishment.type, {
    cascade: ["insert", "update"],
  })
  establishments: Establishment[];
}
