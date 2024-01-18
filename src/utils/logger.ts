import { logger } from '../config/logger';
// import './raw'
export const log = (level : string, message : any) : void =>{
    logger.log(level, { timestamp : new Date(), message })
}