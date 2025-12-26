export {};

declare global {
  // <T> è il "segnaposto" per il tipo che deciderai tu di volta in volta
  function $<T extends HTMLElement = HTMLElement>(selector: string): T | null;
}