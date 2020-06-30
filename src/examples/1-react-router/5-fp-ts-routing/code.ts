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

const router = topicsID.parser
  .map<Location>(obj => {
    return {
      type: 'TopicsID',
      id: obj.id,
    };
  })
  .alt(
    home.parser.map(() => {
      return {
        type: 'Home',
      };
    }),
  )
  .alt(
    about.parser.map(() => ({
      type: 'About',
    })),
  )
  .alt(
    topics.parser.map(() => ({
      type: 'Topics',
    })),
  );

const parse = (s: string): Location =>
  R.parse<Location>(router, R.Route.parse(s), {
    type: 'NotFound',
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

const parseExamples = [
  parse('/topics/anything'),
  parse('/bad/anything'),
  parse('/topics/anything/whoops'),
  parse('/topics/What%20will%20happen%3F'),
  parse(''),
  parse('/'),
  parse('about'),
  parse('/about'),
  parse('about/'),
  parse('/about/'),
];
parseExamples.forEach(ex => console.log(ex));

const formatExamples = [
  format({
    type: 'TopicsID',
    id: 'anything',
  }),
  format({
    type: 'TopicsID',
    id: 'What will happen?',
  }),
];
formatExamples.forEach(ex => console.log(ex));
