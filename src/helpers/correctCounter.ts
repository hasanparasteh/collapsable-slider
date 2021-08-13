export function correctCounter(
  counter: number,
  data: Object[] | NodeListOf<Element>
): number {
  if (counter < data.length - 1) {
    counter += 1;
    return counter;
  }
  return 0;
}
