import AppExpress from './config/appExpress';

(async () => {
  try {
    await AppExpress.init();
    await AppExpress.start();
  } catch (erro) {
    await AppExpress.close();
    console.error('Error', erro);
  }
})();
