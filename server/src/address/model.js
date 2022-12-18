

import { writeFileSync, readdirSync, existsSync, mkdirSync, readFileSync } from 'fs'
import path from 'path'
import UID from 'lib/utils/UID'
import validatePhoneNumber from 'lib/utils/validatePhoneNumber'

const dbDirectory = path.join(process.cwd(), '/src/address/db')

if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}

/* 

  const sample = {
    location: {
      address: 'tehran dare abi',
      postalcode: '213139721893',
      geo: {
        lat,
        lon
      },
    },
    reviever: {
      name: "jalal",
      phone: "0912"
    }
  }

*/ 

class AddressSchema {

  constructor() {
    this.cache = null
    this.doesCacheneedsUpdate = true
  }

  // 
  async create({ location, receiver, userId }) {
    
    if (!location || !location.address || !location.postalcode || !receiver || !receiver.name || !receiver.phone) {
      throw new Error('bad request: bad input')
    }

    const validPhone = validatePhoneNumber(req.body.phone)
     
    const thisAddress = {
      _id: UID("ADR"),
      location,
      receiver: {
        name: receiver.name,
        phone: validPhone
      },
      userId,
      deleted: false,
      createdAt: new Date().toISOString()
    }

    writeFileSync(path.join(dbDirectory, `${thisAddress._id}.txt`), JSON.stringify(thisAddress), "utf8")

    this.doesCacheneedsUpdate = true
    return thisAddress

  }

  async findAll() {
    try {

      if (!this.doesCacheneedsUpdate && this.cache) return this.cache;

      const result = readdirSync(dbDirectory).map(item => {
        return JSON.parse(readFileSync(path.join(dbDirectory, item), {
          encoding: "utf8",
        }))
      });

      this.cache = result;
      this.doesCacheneedsUpdate = false;

      return result;
      
    } catch (error) {
      console.log("Error in findAll addresses")
      console.log(error)

      return []
    }
  }

  async findById(_id) {
    try {
      return JSON.parse(readFileSync(path.join(dbDirectory, `${_id}.txt`), {
        encoding: "utf8",
      }));
    } catch (error) {
      return null;
    }
  }

  async findByIdAndUpdate(_id, data) {

    try {
      
      const thisAddress = await this.findById(_id);

      Object.entries(data).forEach(([key, value]) => thisAddress[key] = value)

      thisAddress.updatedAt = new Date().toISOString();

      writeFileSync(
        path.join(
          dbDirectory,
          `${thisAddress._id}.txt`,
          ),
          JSON.stringify(thisAddress),
          "utf8"
      );

      this.doesCacheneedsUpdate = true;

      return "ok";

    } catch (error) {
      throw error;
    }
  }

}

const AddressModel = new AddressSchema();

export default AddressModel

