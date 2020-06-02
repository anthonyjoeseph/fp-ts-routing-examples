import { VisibilityFilter } from "../1-global-state/AppState";
import { makeADT, ofType, ADTType } from "@morphic-ts/adt";

export const AppAction = makeADT('type')({
  ADD_TODO: ofType<{ type: 'ADD_TODO'; text: string }>(),
  SET_VISIBILITY_FILTER: ofType<{
    type: 'SET_VISIBILITY_FILTER',
    filter: VisibilityFilter,
  }>(),
  TOGGLE_TODO: ofType<{
    type: 'TOGGLE_TODO',
    id: number;
  }>(),
});

export type AppAction = ADTType<typeof AppAction>