import * as U from 'unionize';

const Location = U.unionize(
  {
    Home: U.ofType(),
    About: U.ofType(),
    Topics: U.ofType(),
    TopicsID: U.ofType<{ id: string }>(),
    NotFound: U.ofType(),
  },
  { value: 'value', tag: 'type' },
);
type Location = U.UnionOf<typeof Location>;

const format = Location.match({
  Home: () => '/',
  About: () => '/about',
  Topics: () => '/topics',
  TopicsID: ({ id }) => `/topics/${id}`,
  NotFound: () => '/',
});

const UnionizeLocations: Location[] = [
  Location.Home(),
  Location.About(),
  Location.Topics(),
  Location.TopicsID({ id: 'someid' }),
  Location.Home(),
];
UnionizeLocations.map(format).forEach(urls => {
  console.log(`formatted url: ${urls}`);
});
