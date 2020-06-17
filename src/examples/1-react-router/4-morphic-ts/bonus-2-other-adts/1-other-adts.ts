import { makeADT, ofType, ADTType } from "@morphic-ts/adt";
import { unionize, ofType as unionizeOfType, UnionOf } from 'unionize';
import { createFoldObject } from '@iadvize-oss/foldable-helpers';
import { fold as codegenFold, CodegenLocation } from "./3-fp-ts-codegen";

// sum type creation

const MorphicLocation = makeADT('type')({
  Home: ofType(),
  About: ofType(),
  Topics: ofType(),
  TopicsID: ofType<{ type: 'TopicsID'; id: string }>(),
  NotFound: ofType(),
});
type MorphicLocation = ADTType<typeof MorphicLocation>

const UnionizeLocation = unionize({
  Home: unionizeOfType(),
  About: unionizeOfType(),
  Topics: unionizeOfType(),
  TopicsID: unionizeOfType<{ id: string }>(),
  NotFound: unionizeOfType(),
}, { value: 'value', tag: 'type' });
type UnionizeLocation = UnionOf<typeof UnionizeLocation>

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

type FoldableHelpersLocation = Home | About | Topics
| TopicsID | NotFound

const foldableHelpersMatch = createFoldObject({
  Home: (l): l is Home => l.type === 'Home',
  About: (l): l is About => l.type === 'About',
  Topics: (l): l is Topics => l.type === 'Topics',
  TopicsID: (l): l is TopicsID => l.type === 'TopicsID',
  NotFound: (l): l is NotFound => l.type === 'NotFound',
});

// matching

const morphicFormatter = MorphicLocation.matchStrict({
  Home: () => '/',
  About: () => '/about',
  Topics: () => '/topics',
  TopicsID: ({ id }) => `/topics/${id}`,
  NotFound: () => '/',
})

const unionizeFormatter = UnionizeLocation.match({
  Home: () => '/',
  About: () => '/about',
  Topics: () => '/topics',
  TopicsID: ({ id }) => `/topics/${id}`,
  NotFound: () => '/',
});

const foldableHelpersFormatter = foldableHelpersMatch({
  Home: () => '/',
  About: () => '/about',
  Topics: () => '/topics',
  TopicsID: ({ id }) => `/topics/${id}`,
  NotFound: () => '/',
});

const codegenFormatter = codegenFold({
  onHome: () => '/',
  onAbout: () => '/about',
  onTopics: () => '/topics',
  onTopicsID: (id) => `/topics/${id}`,
  onNotFound: () => '/',
})

const locations: MorphicLocation[] = [
  { type: 'Home' },
  { type: 'About' },
  { type: 'Topics' },
  { type: 'TopicsID', id: 'someid' },
  { type: 'Home' },
]
locations
  .map(morphicFormatter)
  // .map(foldableHelpersFormatter)
  .forEach(urls => {
    console.log(`formatted url: ${urls}`);
  });


const unionizeLocations: UnionizeLocation[] = [
  { type: 'Home', value: {} },
  { type: 'About', value: {} },
  { type: 'Topics', value: {} },
  { type: 'TopicsID', value: { id: 'someid' } },
  { type: 'Home', value: {} },
]
unionizeLocations
  .map(unionizeFormatter)
  .forEach(urls => {
    console.log(`formatted url: ${urls}`);
  });

const codegenLocations: CodegenLocation[] = [
  { type: 'Home' },
  { type: 'About' },
  { type: 'Topics' },
  { type: 'TopicsID', value0: 'someid' },
  { type: 'Home' },
];
codegenLocations
  .map(codegenFormatter)
  .forEach(urls => {
    console.log(`formatted url: ${urls}`);
  });
