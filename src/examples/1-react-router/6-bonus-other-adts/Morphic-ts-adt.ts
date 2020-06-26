import { makeADT, ofType, ADTType } from '@morphic-ts/adt';

const Location = makeADT('type')({
  Home: ofType(),
  About: ofType(),
  Topics: ofType(),
  TopicsID: ofType<{ type: 'TopicsID'; id: string }>(),
  NotFound: ofType(),
});
type Location = ADTType<typeof Location>;

const format = Location.matchStrict({
  Home: () => '/',
  About: () => '/about',
  Topics: () => '/topics',
  TopicsID: ({ id }) => `/topics/${id}`,
  NotFound: () => '/',
});

const locations: Location[] = [
  Location.of.Home({}),
  Location.of.About({}),
  Location.of.Topics({}),
  Location.of.TopicsID({ id: 'someid' }),
];
locations.map(format).forEach(urls => {
  console.log(`formatted url: ${urls}`);
});
