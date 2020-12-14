import { Request, Response } from "express";
import { getRepository } from "typeorm";
import RatingView from "../views/RatingView";
import TypeView from "../views/TypeView";
import * as Yup from "yup";
import Type from "../entity/type.entity";

export default {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const typeRepository = getRepository(Type);

    const type = await typeRepository.find({
      relations: ["establishments"],
      where: [
        {
          establishments: {
            id: parseInt(id),
          },
        },
      ],
    });

    return res.json(TypeView.renderMany(type));
  },

  async showType(req: Request, res: Response) {
    const { id } = req.params;

    const typeRepository = getRepository(Type);

    const type = await typeRepository.findOneOrFail(id, {
      relations: ["establishments"],
    });

    return res.json(TypeView.render(type));
  },

  async index(req: Request, res: Response) {
    const typeRepository = getRepository(Type);

    const types = await typeRepository.find({
      relations: ["establishments"],
    });
    return res.json(TypeView.renderMany(types));
  },

  async create(req: Request, res: Response) {
    const { name } = req.body;

    const typeRepository = getRepository(Type);
    const data = {
      name,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required().max(50),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const type = typeRepository.create(data);

    await typeRepository.save(type);

    return res.status(201).json(type);
  },
};
