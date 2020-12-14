import Image from "../entity/image.entity";

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `http://192.168.0.236:3000/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]) {
    return images.map((image) => this.render(image));
  },
};
