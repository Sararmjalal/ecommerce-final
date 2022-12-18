
import jwt from 'jsonwebtoken'
import Admin from 'admin/model'

async function decodeToken(token) {
  
  try {

    if (!token) throw new Error('unathorized')

    const arr = token.split(' ');
    
    if (arr[0] === 'ut') {
      return jwt.verify(arr[1], 'ADMIN_SECRET');
    }
  
    throw new Error('Please Re-Sign In')
  } catch (error) {
    printError(error)
    throw error
  }
}

export default async function adminAuth(req, res, next) {
  
  try {

    const token = req.headers.auth;

    const admin = await decodeToken(token);
    const thisAdmin = await Admin.authorizeAdmin(admin)
    req.admin = thisAdmin
    next()   
  } catch (error) {
    next(error)
  }
}
