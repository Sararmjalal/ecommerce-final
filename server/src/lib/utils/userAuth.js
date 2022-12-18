import jwt from 'jsonwebtoken'

async function decodeToken(token) {
  const arr = token.split(' ');

  try {
    if (arr[0] === 'ut') {
      return jwt.verify(arr[1], 'USER_SECRET');
    }
  
    throw new Error('Please Re-Sign In')
  } catch (error) { 
    print('err')
    throw error
  }
}

export default async (req, res, next) => {
  try {

    const token = req.headers.auth;

    if (token != null) {

      const user = await decodeToken(token);

      req.user = user;
    } else {
      req.user = null;
    }
    return next(); 
  } catch (error) {
    
    req.user = null;
    return next(); 
  }
}