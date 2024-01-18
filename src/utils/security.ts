import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET
const app_key = Number(process.env.APP_KEY)
export const Encrypt_Data =  (payload: any) => {
     const salt =  bcrypt.genSaltSync(app_key)
     const hash =  bcrypt.hashSync(payload, salt)
     return hash 
}



export const Decrypt =  async (userData: any, hashedData: string) => {
     const data =  await bcrypt.compare(userData, hashedData) 
     return data
  }


export const AccessToken =  (id: number) => {
    const access = jwt.sign({id}, secret, {
       algorithm: "RS256",
       expiresIn: '1d'
    })
 
    return access
}

export const VerifyToken =  (token: string | any, secret: string) => {
         return jwt.verify(token, secret)
}