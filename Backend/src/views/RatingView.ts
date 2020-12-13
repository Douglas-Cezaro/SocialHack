import Rating from "../entity/rating.entity";
import EstablishmentViewRating from "./EstablishmentViewRating";
import UserView from "./UserView";

export default {
  render(rating: Rating) {
    return {
      id: rating.id,
      value: rating.value,
      opinion: rating.opinion,
      user: UserView.render(rating.user),
      establishment: EstablishmentViewRating.render(rating.establishment),
    };
  },
  renderMany(ratings: Rating[]) {
    return ratings.map((rating) => this.render(rating));
  },
};
