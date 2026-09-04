/** The copy-trading product page carries its own gold pill in a sticky sub-nav. */
export function isProductPage(pathname: string): boolean {
  return /^\/(en|ms)\/copy-trading\/?$/.test(pathname);
}
