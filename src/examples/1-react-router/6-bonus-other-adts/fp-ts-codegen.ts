import * as C from './CodegenLocation';

const codegenFormatter = C.fold({
  onHome: () => '/',
  onAbout: () => '/about',
  onTopics: () => '/topics',
  onTopicsID: id => `/topics/${id}`,
  onNotFound: () => '/',
});

const codegenLocations: C.Location[] = [
  C.home,
  C.about,
  C.topics,
  C.topicsID('someid'),
];
codegenLocations.map(codegenFormatter).forEach(urls => {
  console.log(`formatted url: ${urls}`);
});
