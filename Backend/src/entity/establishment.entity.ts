import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Rating from "./rating.entity";
import Image from "./image.entity";
import Type from "./type.entity";
@Entity("establishments")
export default class Establishment {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  contact: string;

  @OneToMany(() => Image, (image) => image.establishment, {
    cascade: ["insert", "update"],
  })
  images: Image[];

  @OneToMany(() => Rating, (rating) => rating.establishment, {
    cascade: ["insert", "update"],
  })
  ratings: Rating[];

  @ManyToOne(() => Type, (type) => type.establishments)
  type: Type;
}
