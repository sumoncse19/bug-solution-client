export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
