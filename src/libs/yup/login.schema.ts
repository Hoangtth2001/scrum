import * as yup from 'yup';

import { VALIDATE_MESSAGES } from 'configs';

export const loginSchema = yup.object().shape({
  username: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
  password: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
});
