import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import Establishment from "../entity/establishment.entity";
import Rating from "../entity/rating.entity";
import EstablishmentView from "../views/EstablishmentView";

export default {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const establishmentRepository = getRepository(Establishment);

    const establishment = await establishmentRepository.findOneOrFail(id, {
      relations: ["images", "ratings", "type"],
    });

    return res.json(EstablishmentView.render(establishment));
  },

  async index(req: Request, res: Response) {
    const establishmentRepository = getRepository(Establishment);

    const establishments = await establishmentRepository.find({
      relations: ["images", "ratings", "type"],
    });

    return res.json(EstablishmentView.renderMany(establishments));
  },

  async rating(req: Request, res: Response) {
    const { id } = req.params;
    const ratingRepository = getRepository(Rating);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
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

    const x = rating.length;
    var valor = 0;
    if (rating.length > 0) {
      const ratings = rating.map((rating) => {
        return rating.value;
      });
      const val = ratings.reduce(reducer);
      valor = val / x;
    }

    return res.json(valor);
  },

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      contact,
      type,
    } = req.body;

    const establishmentRepository = getRepository(Establishment);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      contact,
      images,
      type,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      contact: Yup.string().required(),
      type: Yup.number().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const establishment = establishmentRepository.create(data);

    await establishmentRepository.save(establishment);

    return res.status(201).json(establishment);
  },
};
