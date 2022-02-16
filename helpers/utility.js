import pkg from 'atob';
const {atob} = pkg;

export const randomNumber = (length) => {
    let text = "";
    const possible = "123456789";
    for (let i = 0; i < length; i++) {
      const sup = Math.floor(Math.random() * possible.length);
      text += i > 0 && sup == i ? "0" : possible.charAt(sup);
    }
    return Number(text);
  };

  export const decodeCookie = (cookie) => {
    try {
      const [, payload] = cookie.split('.');
      return JSON.parse(atob(payload));
    } catch (e) {
      return {
        userName: '',
        exp: 0,
        iat: 0
      };
    }
  }