import Rate from "./model"
import UserModel from "user/model"

export default {
  sumbitRate: async (req, res) => {
    try {
      const thisUser = await UserModel.authorizeUser(req.user)
      await Rate.rateProduct({
        productId: req.body.productId,
        userId: thisUser._id,
        score: req.body.score
      })
      
      return res.status(200).json({msg: 'ok'})
  
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}