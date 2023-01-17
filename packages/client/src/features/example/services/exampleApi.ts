export const fetchURL = (link: string) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(console.log(`api call`)), 500)
  );
}
// Проверка того что отрабатывает линтер
