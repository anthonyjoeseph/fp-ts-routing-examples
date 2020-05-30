import { end, lit, int, parse, format, Route, str } from "fp-ts-routing"

interface Home {
  readonly type: 'Home'
}

interface About {
  readonly type: 'About'
}

interface Topics {
  readonly type: 'Topics'
}

interface TopicsID {
  readonly type: 'TopicsID'
  readonly id: string
}

interface NotFound {
  readonly type: 'NotFound'
}

type Location = Home | About | Topics
| TopicsID | NotFound

const home = end
const about = lit('about').then(end)
const topics = lit('topics').then(end)
const topicsID = lit('topics')
  .then(str('id'))
  .then(end)

const router = /*zero<Location>().alt*/home.parser.map<Location>(
    () => ({
      type: 'Home'
    })
  )
  .alt(about.parser.map(() => ({
    type: 'About'
  })))
  .alt(topics.parser.map(() => ({
    type: 'Topics'
  })))
  .alt(topicsID.parser.map(({ id }) => ({
    type: 'TopicsID',
    id,
  })))

const parser = (s: string): Location => parse(
  router,
  Route.parse(s),
  { type: 'NotFound' },
)
const formatter = (l: Location): string => {
  switch (l.type) {
    case 'Home':
      return format(home.formatter, l);
    case 'About':
      return format(about.formatter, l);
    case 'Topics':
      return format(topics.formatter, l);
    case 'TopicsID':
      return format(topicsID.formatter, l);
    case 'NotFound':
      return '/';
  }
}

const locations = [
  parser(''),
  parser('/'),
  parser('/home'),
  parser('home/'),
  parser('/users/123'),
  parser('/users/-44'),
  parser('/users/100.11'),
  parser('/users/'),
  parser('/users'),
]
locations.forEach(location => {
  console.log(`parsed location type: ${JSON.stringify(location)}`);
});

const urls = [
  formatter({ type: 'Home' }),
  formatter({ type: 'About' }),
  formatter({ type: 'Topics' }),
  formatter({ type: 'TopicsID', id: 'someid' }),
  formatter({ type: 'Home' }),
]
urls.forEach(urls => {
  console.log(`formatted url: ${urls}`);
});

export const four = 3;