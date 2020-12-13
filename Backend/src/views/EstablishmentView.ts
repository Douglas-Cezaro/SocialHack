import Establishment from "../entity/establishment.entity";
import imagesView from "./ImagesView";
import RatingView from "./RatingView";

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
      // ratings: RatingView.renderMany(establishment.ratings),
    };
  },

  renderMany(establishments: Establishment[]) {
    return establishments.map((establishment) => this.render(establishment));
  },
};
