const endpoints = [
  //---------------------CREATE-ADMIN-----------------------//
  {
    endpoint: "http://localhost:4313/admin/create",
    method: "POST",
    body: {
      name: String,
      phone: String,
    },
    requiresAuth: false,
    auth: 'none',
    possibleErrors: [
      {
        error: "bad input",
        reason: "this phonenumber already exists in the database",
      },
    ],
  },

  //---------------------LOGIN-ADMIN-----------------------//
  {
    endpoint: "http://localhost:4313/admin/login-step-one",
    method: "POST",
    body: {
      phone: String,
    },
    requiresAuth: false,
    possibleErrors: [
      {
        error: "bad input",
        reason:
          "you probably forgot to give the required params or misspeled something",
      },
    ],
    response: {
      msg: "ok",
    },
  },

  {
    endpoint: "http://localhost:4313/admin/login-step-two",
    method: "POST",
    body: {
      phone: String,
      code: String,
    },
    requiresAuth: false,
    possibleErrors: [
      {
        error: "bad input",
        reason:
          "you probably forgot to give the required params or misspeled something",
      },
      {
        error: "this username already exists in the database",
        reason: "self explanatory",
      },
    ],
    response: {
      token: String,
    },
    notes: ["you should store this token somewhere eg. cookies"],
  },
  //---------------------ME-ADMIN-----------------------//
  {
    endpoint: "http://localhost:4313/admin/me",
    method: "POST",
    body: {},
    requiresAdminAuth: true,
    possibleErrors: [
      {
        error: "Unathorized",
        reason:
          "you probably didnt send the token in the currect form in the header",
      },
    ],
    response: {
      _id: "userId",
      ...rest,
    },
    notes: [
      "in order to check if this is successful or not, u should check if the response contains the field _id",
    ],
  },
  //---------------------USER-SIGNUP-----------------------//
  {
    endpoint: "http://localhost:4313/user/sign-up-one",
    method: "POST",
    body: {
      phone: String,
      name: String,
    },
    requiresAuth: false,
    possibleErrors: [
      {
        error: "bad input",
        reason: "bad input",
      },
      {
        error: "this user already exists in the database",
        reason: "self explanatory",
      },
    ],
  },

  {
    endpoint: "http://localhost:4313/user/sign-up-two",
    method: "POST",
    body: {
      code: String,
      phone: String, // you should handle it and send it to the back-end, user shouldn't write the phone again
    },
    requiresAuth: false,
    possibleErrors: [
      {
        error: "bad input",
        reason: "bad input",
      },
      {
        error: "this username already exists in the database",
        reason: "self explanatory",
      },
    ],
    response: {
      token: String,
    },
    notes: ["you should store this token somewhere eg. cookies"],
  },
  //---------------------USER-LOGIN-----------------------//
  {
    endpoint: "http://localhost:4313/user/login-one",
    method: "POST",
    body: {
      phone: String,
    },
    requiresAuth: false,
    possibleErrors: [
      {
        error: "bad input",
        reason: "bad input",
      },
      {
        error: "this username already exists in the database",
        reason: "self explanatory",
      },
    ],
    response: { msg: "ok" },
  },
  {
    endpoint: "http://localhost:4313/user/login-two",
    method: "POST",
    body: {
      code: String,
      phone: String, // you should handle it and send it to the back-end, user shouldn't write the phone again
    },
    requiresAuth: false,
    possibleErrors: [
      {
        error: "bad input",
        reason:
          "bad input",
      },
      {
        error: "this username already exists in the database",
        reason: "self explanatory",
      },
    ],
    response: {
      token: String,
    },
    notes: ["you should store this token somewhere eg. cookies"],
  },
  //---------------------USER-ME-----------------------//
  {
    endpoint: "http://localhost:4313/user/me",
    method: "POST",
    body: {},
    requiresAuth: true,
    possibleErrors: [
      {
        error: "Unathorized",
        reason:
          "you probably didnt send the token in the currect form in the header",
      },
    ],
    response: {
      _id: "userId",
      ...rest,
    },
    notes: [
      "in order to check if this is successful or not, u should check if the response contains the field _id",
    ],
  },
  //---------------------USER-EDIT-----------------------//
  {
    endpoint: "http://localhost:4313/user/edit",
    method: "POST",
    body: {
      name: String,
    },
    requiresAuth: true,
    possibleErrors: [
      {
        error: "Unathorized",
        reason:
          "you probably didnt send the token in the currect form in the header",
      },
      {
        error: "bad input",
        reason:
          "you probably forgot to give the required params or misspeled something",
      },
    ],
    response: {
      msg: "user edited",
    },
  },

  //---------------------CART-----------------------//
  {
    endpoint: 'http://localhost:4313/cart/',
    method: 'GET',
    requiresAuth: false,
    response: 'a list of users in form of an array'
  },

  //---------------------ADD-CART-----------------------//
  {
    endpoint: "http://localhost:4313/cart/add",
    method: "POST",
    requiresAuth: true,
    body: {
      productId: String,
      userId: String
    },
    possibleErrors: [
      {
        error: "bad request: bad inputs",
        reason:
          "you probably forgot to give the required params or misspeled something",
      },
      {
        error: "unathorized",
        reason: "u probably forgot to send the headers in the correct format",
      },
    ],
    response: {msg: 'ok'}
  },

  //---------------------REMOVE-CART-----------------------//
  {
    endpoint: "http://localhost:4313/cart/remove",
    method: "POST",
    requiresAuth: true,
    body: {
      productId: String,
      userId: String
    },
    possibleErrors: [
      {
        error: "bad request: bad input",
        reason:
          "you probably forgot to give the required params or misspeled something",
      },
      {
        error: "bad request: no such cart exists",
        reason: "self explanatory",
      },
      {
        error: "unathorized",
        reason: "u probably forgot to send the headers in the correct format",
      },
    ],
    response: {
      msg: "ok",
    },
  },
  //---------------------CHANGE-CART-----------------------//
  {
    endpoint: "http://localhost:4313/cart/change",
    method: "POST",
    requiresAuth: true,
    body: {
      productId: String,
      userId: String,
      quantity: Number
        },
    possibleErrors: [
      {
        error: "bad request: bad input",
        reason:
          "you probably forgot to give the required params or misspeled something",
      },
      {
        error: "bad request: no such cart exists",
        reason: "self explanatory",
      },
      {
        error: "unathorized",
        reason: "u probably forgot to send the headers in the correct format",
      },
    ],
    response: {
      msg: "successfully created this category",
    },
  },
  //---------------------CATEGORY-CREATE-----------------------//
  {
    endpoint: "http://localhost:4313/category/create",
    method: "POST",
    body: {
      name: String,
      variables: String,
    },
    requiresAuth: false,
    possibleErrors: [
      {
        error: "bad input",
        reason:
          "you probably forgot to give the required params or misspeled something",
      },
    ],
    response: {
      msg: 'successfully created this category',
    }
  },
  //---------------------CATEGORY-GET-----------------------//
  {
    endpoint: "http://localhost:4313/category/",
    method: "GET",
    requiresAuth: false,
    response: "a list of users in form of an array",
  },

  //---------------------COMMENT-SUBMIT-----------------------//
  {
    endpoint: "http://localhost:4313/comment/submit",
    method: "POST",
    requiresAuth: true,
    body: {
      text: String,
      productId: String,
    },
    possibleErrors: [
      {
        error: "bad request: bad inputs",
        reason:
          "you probably forgot to give the required params or misspeled something",
      },
      {
        error: "not valid user",
        reson: 'user not found'
      },
      {
        error: "bad request: no such product found",
        reson: 'you didnt choose the product and product id'
      },
      {
        error: "unathorized",
        reason: "u probably forgot to send the headers in the correct format",
      },
    ],
    response: {
      msg: "ok",
    },
  },
  //---------------------COMMENT-GET-----------------------//
  {
    endpoint: "http://localhost:4313/comment/:productId",
    method: "GET",
    requiresAuth: false,
    possibleErrors: [
      {
        error: "bad request: no such product found",
        reason: "self explanatory",
      },
    ],
    response: "comment for specific product",
  },
  //---------------------ORDER-GET-----------------------//
  {
    endpoint: "http://localhost:4313/order/my-orders",
    method: "GET",
    requiresAuth: true,
    possibleErrors: [

      {
        error: "bad request: no such order exists",
        reason: "self explanatory",
      },
    ],
    response: "comment for specific product",
  },
  //---------------------ORDER-CHECK-OUT-----------------------//

  //---------------------PRODUCT-CREATE-----------------------//
  {
    endpoint: "http://localhost:4313/product/create",
    method: "POST",
    body: {
      title: String,
      price: Number,
      quantity: Number,
      description: String,
      isAvailable: Boolean,
      images: [String],
      categoryId: String,
      variables: String,
    },
    requiresAdminAuth: true,
    possibleErrors: [
      {
        error: "Unathorized",
        reason:
          "you probably didnt send the token in the correct form in the header",
      },
      {
        error: "bad request: bad inputs",
        reason:
          "you probably forgot to give the required params or misspeled something",
      },
    ],
    response: {
      msg: "successfully created this product",
      _id: String,
    },
    notes: [
      "the _id returned in the resposne is the id of newly created product which u can navigate to using it",
    ],
  },

  //---------------------PRODUCT-EDIT-----------------------//

  {
    endpoint: "http://localhost:4313/product/edit",
    method: "POST",
    body: {
      productId: String,
      title: String,
      price: Number,
      quantity: Number,
      description: String,
      isAvailable: Boolean,
      images: String,
      categoryId: String,
      variables: String,
    },
    requiresAdminAuth: true,
    possibleErrors: [
      {
        error: "Unathorized",
        reason:
          "you probably didnt send the token in the correct form in the header",
      },
      {
        error: "bad request: bad inputs",
        reason:
          "you probably forgot to give the required params or misspeled something",
      },
    ],
    response: {
      msg: "Product successfully edited",
    },
  },
  //---------------------PRODUCT-ALL-PRODUCTS-----------------------//
  {
    endpoint: "http://localhost:4313/product/",
    method: "GET",
    requiresAuth: false,
    response: "returns a list of products",
  },

  {
    endpoint: "http://localhost:4313/product/top-products",
    method: "GET",
    requiresAuth: false,
    response: "returns a list of top products based on their average score",
  },

  {
    endpoint: "http://localhost:4313/product/:_id",
    method: "GET",
    requiresAuth: false,
    possibleErrors: [
      {
        error: "bad request: no such product exists",
        reason: "self explanatory",
      },
    ],
    response: "returns the product based on the id u sent to the server",
  },

  {
    endpoint: "http://localhost:4313/rate/submit",
    method: "POST",
    requiresAuth: true,
    body: {
      productId: String, // the id of the product which u want to submit a score,
      userId: String,
      score: Number, // the actual score u want to give: 1-5
    },
    possibleErrors: [
      {
        error: "bad request: bad input",
        reason:
          "you probably forgot to give the required params or misspeled something",
      },
      {
        error: "bad request: no such product exists",
        reason: "self explanatory",
      },
      {
        error: "unathorized",
        reason: "u probably forgot to send the headers in the correct format",
      },
    ],
    response: {
      msg: "ok",
    },
  },
];
