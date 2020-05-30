import * as t from 'io-ts'
import { lit, str, query, Route, parse, format } from 'fp-ts-routing'

const AorBCodec = t.union([
  t.literal('a'),
  t.literal('b')
])
type AorB = t.TypeOf<typeof AorBCodec>

interface AccountQuery {
  type: 'AccountQuery';
  accountId: string; // accountId: number //accountId: AorB
  pathparam: string;
}
interface NotFound {
  readonly type: 'NotFound'
}
type Location = AccountQuery | NotFound

const accountMatch = lit('accounts')
  .then(str('accountId')) //.then(int('accountId')) //.then(type('accountId', AorBCodec))
  .then(lit('files'))
  .then(query(
    t.strict({ pathparam: t.string })
  ))

const router = accountMatch.parser.map<Location>(
  ({ accountId, pathparam }) => ({
    type: 'AccountQuery',
    accountId,
    pathparam,
  })
);

const parser = (s: string): Location => parse(
  router,
  Route.parse(s),
  { type: 'NotFound' },
)
const formatter = (l: Location): string => {
  switch (l.type) {
    case 'AccountQuery':
      return format(accountMatch.formatter, l);
    case 'NotFound':
      return '/';
  }
}

const locations = [
  parser('/someaccountid/files?pathparam=somepath'),
  parser('/someaccountid/notfiles?pathparam=somepath'),
  parser('/someaccountid/files?notpathparam=somepath'),
  // parser('/a/files?pathparam=somepath'),
  // parser('/b/files?pathparam=somepath'),
  // parser('/c/files?pathparam=somepath'),
]
locations.forEach(location => {
  console.log(`parsed location type: ${JSON.stringify(location)}`);
});

const urls = [
  formatter({
    type: 'AccountQuery',
    accountId: 'someaccountid',
    pathparam: 'somepath',
  }),
  /* formatter({
    type: 'AccountQuery',
    accountId: 'c',
    pathparam: 'somepath',
  }), */
  /* formatter({
    type: 'AccountQuery',
    accountId: 'a',
    pathparam: 'somepath',
  }), */
]
urls.forEach(urls => {
  console.log(`formatted url: ${urls}`);
});

console.log()