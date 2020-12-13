import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Rating from "../entity/rating.entity";
import RatingView from "../views/RatingView";
import * as Yup from "yup";

export default {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const ratingRepository = getRepository(Rating);

    const rating = await ratingRepository.find({
      relations: ["establishment", "user"],
      where: [
        {
          establishment: {
            id: parseInt(id),
          },
        },
      ],
    });

    return res.json(RatingView.renderMany(rating));
  },

  async index(req: Request, res: Response) {
    const ratingRepository = getRepository(Rating);

    const ratings = await ratingRepository.find({
      relations: ["establishment", "user"],
    });
    return res.json(RatingView.renderMany(ratings));
  },

  async create(req: Request, res: Response) {
    const { value, opinion, user, establishment } = req.body;

    const ratingRepository = getRepository(Rating);
    const data = {
      value,
      opinion,
      user,
      establishment,
    };

    const schema = Yup.object().shape({
      value: Yup.number().required().min(1).max(5),
      opinion: Yup.string().required().max(50),
      user: Yup.number().required(),
      establishment: Yup.number().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const rating = ratingRepository.create(data);

    await ratingRepository.save(rating);

    return res.status(201).json(rating);
  },
};
