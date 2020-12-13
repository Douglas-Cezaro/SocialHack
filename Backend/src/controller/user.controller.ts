import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "../entity/user.entity";
import UserView from "../views/UserView";
import * as Yup from "yup";

export default {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id, {
      relations: ["ratings"],
    });

    return res.json(UserView.render(user));
  },

  async index(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find({
      relations: ["ratings"],
    });

    return res.json(UserView.renderMany(users));
  },

  async create(req: Request, res: Response) {
    const { name, email, password, contact, age, about } = req.body;

    const userRepository = getRepository(User);
    const data = {
      name,
      email,
      password,
      contact,
      age,
      about,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      contact: Yup.string().required(),
      about: Yup.string().required().max(300),
      age: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = userRepository.create(data);

    await userRepository.save(user);

    return res.status(201).json(user);
  },
};
