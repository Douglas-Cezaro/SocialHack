import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";
import Establishment from "../entity/establishment.entity";
import EstablishmentView from "../views/EstablishmentView";

export default {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const establishmentRepository = getRepository(Establishment);

    const establishment = await establishmentRepository.findOneOrFail(id, {
      relations: ["images", "ratings"],
    });

    return res.json(EstablishmentView.render(establishment));
  },

  async index(req: Request, res: Response) {
    const establishmentRepository = getRepository(Establishment);

    const establishments = await establishmentRepository.find({
      relations: ["images", "ratings"],
    });

    return res.json(EstablishmentView.renderMany(establishments));
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
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      contact: Yup.string().required(),
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
