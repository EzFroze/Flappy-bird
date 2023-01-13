export const validateEmail = {
  required: '⚠ Поле не может быть пустым',
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: '⚠ Значение введено неверно',
  },
}
export const validateName = {
  required: '⚠ Поле не может быть пустым',
  pattern: {
    value: /^[A-Za-zА-Яа-я-]/i,
    message: '⚠ Значение введено неверно',
  },
  maxLength: {
    value: 20,
    message: '⚠ Значение больше 20 символов',
  },
  minLength: {
    value: 3,
    message: '⚠ Значение меньше 3 символов',
  },
}
export const validateLogin = {
  required: '⚠ Поле не может быть пустым',
  pattern: {
    value: /^(?=[\S]+)(?=.*[^0-9 ].*)[a-zA-Z0-9_-]/,
    message: '⚠ Значение введено неверно',
  },
  maxLength: {
    value: 20,
    message: '⚠ Значение больше 20 символов',
  },
  minLength: {
    value: 3,
    message: '⚠ Значение меньше 3 символов',
  },
}
export const validatePhone = {
  required: '⚠ Поле не может быть пустым',
  pattern: {
    value: /^\+?[1-9][0-9]{7,14}$/,
    message: '⚠ Значение введено неверно',
  },
}
export const validatePassword = {
  required: '⚠ Поле не может быть пустым',
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/i,
    message: '⚠ Значение введено неверно',
  },
}
