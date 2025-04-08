export const shortenTitle = (title: string, maxLength: number) =>
  title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
