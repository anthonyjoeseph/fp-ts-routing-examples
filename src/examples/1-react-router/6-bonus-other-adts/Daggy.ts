import * as daggy from 'daggy';

const Location = daggy.taggedSum('Location', {
  Home: [],
  About: [],
  Topics: [],
  TopicsID: ['id'],
  NotFound: [],
});

Location.prototype.format = function() {
  return this.cata({
    Home: () => '/',
    About: () => '/about',
    Topics: () => '/topics',
    TopicsID: (id: string) => `/topics/${id}`,
    NotFound: () => '/',
  });
};

const urls = [
  Location.Home,
  Location.About,
  Location.Topics,
  Location.TopicsID('someid'),
];
urls
  .map(l => l.format())
  .forEach(urls => {
    console.log(`formatted url: ${urls}`);
  });
