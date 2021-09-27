import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import * as multer from 'multer'
import { extname } from 'path'

export const config: MulterOptions = {
  storage: multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, callback) => {
      callback(null, new Date().valueOf() + extname(file.originalname))
    }
  })
}
