import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';
import { cpus } from 'os';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cpus(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
