import Type from "../entity/type.entity";
import EstablishmentViewRating from "./EstablishmentViewRating";

export default {
  render(type: Type) {
    return {
      id: type.id,
      name: type.name,
    };
  },
  renderMany(types: Type[]) {
    return types.map((type) => this.render(type));
  },
};
