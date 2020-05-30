import * as daggy from 'daggy';

const DaggyLocation = daggy.taggedSum(
  'Location',
  {
    Home: [],
    About: [],
    Topics: [],
    TopicsID: ['id'],
    NotFound: [],
  },
)

const daggyFormatter = (daggyLocation) => daggyLocation.cata({
  Home: () => '/',
  About: () => '/about',
  Topics: () => '/topics',
  TopicsID: (id) => `/topics/${id}`,
  NotFound: () => '/',
});

const urls = [
  { type: 'Home' },
  { type: 'About' },
  { type: 'Topics' },
  { type: 'TopicsID', id: 'someid' },
  { type: 'Home' },
]
urls
  .map(daggyFormatter)
  .forEach(urls => {
    console.log(`formatted url: ${urls}`);
  });
