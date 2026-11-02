/** Church information supplied by the congregation. Keep visit details current here. */
export const church: {
  name: string;
  serviceTimes: string | null;
  address: string | null;
  mapsUrl: string | null;
  email: string | null;
  phone: string | null;
} = {
  name: 'The Grove Baptist Church',
  serviceTimes: 'Sunday School · 9:30 am\nSunday Worship · 10:30 am',
  address: '70 West St\nWhiteland, Indiana 46184',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=70+West+St+Whiteland+Indiana+46184',
  email: 'ingrovechurch@gmail.com',
  phone: '(317) 800-0515',
};
