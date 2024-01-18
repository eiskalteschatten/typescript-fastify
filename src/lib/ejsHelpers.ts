export const formatLocaleDateTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
