
import UserModel from 'user/model'
import AddressModel from './model'

export default {

  create: async (req, res) => {

    const { location, receiver } = req.body

    if (!req.body.location || !req.body.receiver) throw errs.badInputErr
    const thisUser = await UserModel.authorizeUser(req.user)

    await AddressModel.create({ location, receiver, userId: thisUser._id }) 
    
    return res.status(200).json({ msg: 'ok' })
    
  },
  edit: async (req, res) => {

    if (!req.body._id || !req.body.data) throw errs.badInputErr
    const thisUser = await UserModel.authorizeUser(req.user)
    const { location, receiver } = req.body.data

    console.log(req.body.data)

    await AddressModel.findByIdAndUpdate(req.body._id, { location, receiver, userId: thisUser._id })
    
    return res.status(200).json({ msg: 'ok' })
  },
  user_mylist: async (req, res) => {
    const thisUser = await UserModel.authorizeUser(req.user)
    const addresses = deepClone((await AddressModel.findAll()).filter(item => !item.deleted && (item.userId == String(thisUser._id))))
    // console.log(addresses,"ADDRESSSSSSES")
    return res.status(200).json(addresses)

    // return (await AddressModel.findAll()).filter(item => !item.deleted && (item.userId == String(thisUser._id)))
  },
  adming_hislist: async (req, res) => {
    if (!req.body.userId) throw new Error("bad request: userId missing")

    return (await AddressModel.findAll()).filter(item => item.userId == req.body.userId)

  },
  delete: async (req, res) => {
    
    if (!req.body._id) throw errs.badInputErr

    const [thisUser, thisAddress] = await Promise.all([
      UserModel.authorizeUser(req.user),
      AddressModel.findById(req.body._id)
    ]);

    if (thisUser._id !== thisAddress.userId) throw new Error("unathorized")

    await AddressModel.findByIdAndUpdate(req.body._id, { deleted: true })
    
    return res.status(200).json({ msg: 'ok' });
  },

}