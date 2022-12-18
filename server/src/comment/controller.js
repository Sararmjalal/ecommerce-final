import Comment from "./model";
import Product from "../product/model";
import UID from "lib/utils/UID";
import UserModel from "user/model"
export default {
  createComment: async (req, res) => {
    try {
      const thisUser = await UserModel.authorizeUser(req.user)
      if (!req.body.text || !req.body.productId) throw new Error("bad request: bad inputs");
      if(!thisUser) throw new Error("not validated user")
      const thisProduct = await Product.findById(req.body.productId);
      if (!thisProduct || !thisProduct._id) throw new Error("bad request: no such product found");
      await Comment.create({
        ...req.body,
        userId: thisUser._id,
      });

      return res.status(200).json({ msg: "ok" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getComment: async (req, res) => {
    try {
      const thisProduct = await Product.findById(String(req.params.id));

      console.log(req.params);

      if (!thisProduct || !thisProduct._id)
        throw new Error("bad request: no such product found");

      const thisComment = deepClone(
        await Comment.getProductComments(thisProduct._id)
      );

      
      return res.status(200).json(thisComment);
    } catch (error) {
      return res.json({ msg: error.message });
    }
  },
};
