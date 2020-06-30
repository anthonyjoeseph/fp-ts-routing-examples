
# Examples
  1. React Router
      1. Location & History APIs
          0. React Router
          1. pathname, anchor
          2. pushState, onpopstate
          - Bonus - What's history state?
          3. Union types
          4. Tagged Unions
          5. fp-ts-routing
          - Bonus: Ints, Queries and Types
          6. morphic-ts
          - Bonus: verified
          - Bonus: other sum type libraries
          7. morphic-ts-routing
  - (Optional) Next.js & SSR
      1. Router
      2. Removing flicker
      3. Hyradtion-safe URL
      4. Data fetch
      5. Hydration-safe Data Fetch
  2. Data Model
      1. TodoMVC
      2. react-testing-library
      3. router
      4. SSOT
      5. test
  3. Reactive Architecture with Redux
      1. redux
          1. global state
          2. store and reducer
          3. morphic-ts
          4. test
          5. router attempt (failure)
          6. Bonus: monocle-ts
      2. rxjs
          1. currying, pipe & flow
          2. rxjs
          3. Bonus: testing the router with rxjs
      3. redux-observable
          1. onpopstate
          2. pushState
          3. Test the epic
      4. TodoMVC in purer reactive architectures
          1. [Elm](https://github.com/kadikraman/elm-todo/blob/master/src/Main.elm)
          2. [Reflex](https://github.com/reflex-frp/reflex-todomvc/blob/develop/src/Reflex/TodoMVC.hs)
          3. [Halogen](https://github.com/holdenlee/halogen-todo/blob/master/src/Main.purs)

## Running the Example Code

You can run the code in this repository by pointing the `App` component import in `src/index.ts` to the `App.ts` file corresponding to the video.

For the nextjs/ssr tutorial, you can run the code in this repository by pointing the `handleRoute` function import in `server/server.tsx` to the `handleRoute.ts` file corresponding to the video, as well as the `clientAppElement` function import in `server/hydrate.tsx`.

## SSR Setup

[Express SSR (using create-react-app)](https://gist.github.com/anthonyjoeseph/bdcf9be5cfc515cad334b687237c1556)

### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
