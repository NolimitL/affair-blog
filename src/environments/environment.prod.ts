import { Environment } from './interface';
export const environment: Environment = {
  production: true,
  apiKey: "AIzaSyDLS9EjHLmdWmplp3C6-_6V6YaDXmTWGGE",
  fbDataBaseUrl: "https://blog-affairs.firebaseio.com"
};
/**
 * Для реально выпуска приложения надо использовать другой ключ,
 * который будет общатся с базой данных (просто другая база данных Firebase)
 */
