import * as R from 'fp-ts-routing';

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

const home = R.end;
const about = R.lit('about').then(R.end);
const topics = R.lit('topics').then(R.end);
const topicsID = R.lit('topics')
  .then(R.str('id'))
  .then(R.end);

const router = home.parser
  .map<Location>(() => ({
    type: 'Home',
  }))
  .alt(
    about.parser.map(() => ({
      type: 'About',
    })),
  )
  .alt(
    topics.parser.map(() => ({
      type: 'Topics',
    })),
  )
  .alt(
    topicsID.parser.map(({ id }) => ({
      type: 'TopicsID',
      id,
    })),
  );

const parse = (s: string): Location =>
  R.parse(router, R.Route.parse(s), { type: 'NotFound' });

const locations = [
  parse(''),
  parse('/'),
  parse('/about'),
  parse('about'),
  parse('/topics'),
  parse('/topics/'),
  parse('/topics/anything'),
];
locations.forEach(location => {
  console.log(`parsed location type: ${JSON.stringify(location)}`);
});

const format = (l: Location): string => {
  switch (l.type) {
    case 'Home':
      return R.format(home.formatter, l);
    case 'About':
      return R.format(about.formatter, l);
    case 'Topics':
      return R.format(topics.formatter, l);
    case 'TopicsID':
      return R.format(topicsID.formatter, l);
    case 'NotFound':
      return '/';
  }
};

const urls = [
  format({ type: 'Home' }),
  format({ type: 'About' }),
  format({ type: 'Topics' }),
  format({ type: 'TopicsID', id: 'someid' }),
  format({ type: 'NotFound' }),
];
urls.forEach(urls => {
  console.log(`formatted url: ${urls}`);
});
