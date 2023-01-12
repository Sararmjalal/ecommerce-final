import {
  writeFileSync,
  readdirSync,
  existsSync,
  mkdirSync,
  readFileSync,
} from "fs";
import path from "path";
import UID from "lib/utils/UID";
import ProductModel from "../product/model";

const dbDirectory = path.join(process.cwd(), "/src/cart/db");

if (!existsSync(dbDirectory)) {
  mkdirSync(dbDirectory)
}


class CartSchema {

  constructor() {
    this.cache = null;
    this.doesCacheneedsUpdate = true;
  }

  async addToCart({ productId, userId, quantity, thisVariables }) {
    
    try {
      
      if (!productId) throw new Error("bad input")
      
      let thisCart = await this.findByUserId(userId)

      if (!thisCart._id) thisCart = {
          _id: UID("ECC"),
          items: [],
          userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

      const p = thisCart.items.findIndex(item => { item.productId == productId })

      if (p === -1) {
        const thisProduct = await ProductModel.findById(productId)

        if (!thisProduct.isAvailable) throw Error('Product not available')
        if (thisProduct.quantity < quantity) throw Error('Not enough product!')
        
        const variableKeys = Object.keys(thisProduct.variables)
        const keysRight = variableKeys.every(key => !!thisVariables[key])
        
        if (!keysRight) throw Error('Variable keys not right')

        const variablesRight = variableKeys.every(key => {
          const checkOptions = thisProduct.variables[key].some(item => {
            return thisVariables[key][0] === item
          })
          return checkOptions
        })

        if (!variablesRight) throw Error('Variable options not right')
        
        thisCart.items.push({
          productId,
          quantity,
          thisVariables
        })
      }

      writeFileSync(
        path.join(
          dbDirectory,
          `${thisCart._id}.txt`,
        ),
        JSON.stringify(thisCart),
        "utf8"
      );

      this.doesCacheneedsUpdate = true;

    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      if (!this.doesCacheneedsUpdate && this.cache) return this.cache;

      const result = readdirSync(dbDirectory)?.map((item) => {
        return JSON.parse(
          readFileSync(path.join(dbDirectory, item), {
            encoding: "utf-8",
          })
        );
      });

      this.cache = result;
      this.doesCacheneedsUpdate = false;

      return result;

    } catch (error) {
      console.log("Error in findAll");
      console.log(error);

      return [];
    }
  }

  async findByUserId(userId) {
    try {
      const allCart = deepClone(await this.findAll())
      return allCart.find(cart => cart.userId == userId) ?? {}

    } catch (error) {
      throw error
    }
  }

  async removeItem({ userId, productId }) {
    
    try {
      
      const thisCart = deepClone(await this.findByUserId(userId))
      
      if (!thisCart) throw new Error('wtf')
      
      const p = thisCart.items.findIndex(item => item.productId == productId)

      if (p != -1) {
        thisCart.items.splice(p, 1)

        writeFileSync(
          path.join(
            dbDirectory,
            `${thisCart._id}.txt`,
          ),
          JSON.stringify(thisCart),
          "utf8"
        );
  
        this.doesCacheneedsUpdate = true
      }

    } catch (error) {
      throw error
    }
  }

  async changeQuantity({ userId, productId, quantity }) {
    try {
      
      const thisCart = deepClone(await this.findByUserId(userId))

      if (!thisCart._id) throw new Error('this cart doesnt seem to exist')

      const p = thisCart.items.findIndex(item => item.productId == productId )
    
      if (p === -1) throw new Error('bad request: no such product exists')

      const thisProduct = await ProductModel.findById(productId)
      if (thisProduct.quantity < quantity) throw Error('Not enough product!')
      if (quantity <= 0) throw Error('not allowed lool')

      thisCart.items[p].quantity = quantity

      writeFileSync(
        path.join(
          dbDirectory,
          `${thisCart._id}.txt`,
        ),
        JSON.stringify(thisCart),
        "utf8"
      );

      this.doesCacheneedsUpdate = true


    } catch (error) {
      throw error
    }



  }

  async MTCart(userId) {
    const thisCart = deepClone(await this.findByUserId(userId))

    thisCart.items.length = 0

    writeFileSync(
      path.join(
        dbDirectory,
        `${thisCart._id}.txt`,
      ),
      JSON.stringify(thisCart),
      "utf8"
    );

    this.doesCacheneedsUpdate = true
  }



  // async calculateTotalPrice (_id) {
  //   try {

  //     const allProductsCart = await this.findAll()

  //     const thisProducts = await Product.findAll();
      
  //     const thisCalculatePrice = allProductsCart.reduce((acc, cur) => {
  //       const thisProduct = thisProducts.find((product) => product.id == cur.id);
  //       return acc + thisProduct.quantity * thisProduct.price
  //     })

  //     return thisCalculatePrice
      
  //   } catch (error) {
  //     throw error;
  //   }
  // }

}

const CartModel = new CartSchema();

export default CartModel;
