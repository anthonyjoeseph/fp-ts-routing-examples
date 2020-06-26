import { createFoldObject } from '@iadvize-oss/foldable-helpers';

interface Home {
  readonly type: 'Home';
}

interface About {
  readonly type: 'About';
}

interface Topics {
  readonly type: 'Topics';
}

interface TopicsID {
  readonly type: 'TopicsID';
  readonly id: string;
}

interface NotFound {
  readonly type: 'NotFound';
}

type Location = Home | About | Topics | TopicsID | NotFound;

const fold = createFoldObject({
  Home: (l): l is Home => l.type === 'Home',
  About: (l): l is About => l.type === 'About',
  Topics: (l): l is Topics => l.type === 'Topics',
  TopicsID: (l): l is TopicsID => l.type === 'TopicsID',
  NotFound: (l): l is NotFound => l.type === 'NotFound',
});

const format = fold({
  Home: () => '/',
  About: () => '/about',
  Topics: () => '/topics',
  TopicsID: ({ id }) => `/topics/${id}`,
  NotFound: () => '/',
});

const locations: Location[] = [
  { type: 'Home' },
  { type: 'About' },
  { type: 'Topics' },
  { type: 'TopicsID', id: 'someid' },
];
locations.map(format).forEach(urls => {
  console.log(`formatted url: ${urls}`);
});
