import Establishment from "../entity/establishment.entity";
import imagesView from "./ImagesView";
import typeView from "./TypeViewEstablishment";

export default {
  render(establishment: Establishment) {
    return {
      id: establishment.id,
      name: establishment.name,
      latitude: establishment.latitude,
      longitude: establishment.longitude,
      about: establishment.about,
      opening_hours: establishment.opening_hours,
      contact: establishment.contact,
      instructions: establishment.instructions,
      images: imagesView.renderMany(establishment.images),
      type: typeView.render(establishment.type),
    };
  },

  renderMany(establishments: Establishment[]) {
    return establishments.map((establishment) => this.render(establishment));
  },
};
