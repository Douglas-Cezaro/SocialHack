import Establishment from "../entity/establishment.entity";
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
    };
  },

  renderMany(establishments: Establishment[]) {
    return establishments.map((establishment) => this.render(establishment));
  },
};
