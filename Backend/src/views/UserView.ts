import User from "../entity/user.entity";
import RatingView from "./RatingView";

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      contact: user.contact,
      age: user.age,
      about: user.about,
      // ratings: RatingView.renderMany(user.ratings),
    };
  },
  renderMany(users: User[]) {
    return users.map((user) => this.render(user));
  },
};
