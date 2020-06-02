import { VisibilityFilter } from "../../1-redux/1-global-state/AppState";
import { makeADT, ofType, ADTType, unionADT } from "@morphic-ts/adt";

export const TransformAction = makeADT('type')({
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
export type TransformAction = ADTType<typeof TransformAction>

export const AppAction = unionADT([
  TransformAction,
  makeADT('type')({
    SET_VISIBILITY_FILTER_LOCATION: ofType<{
      type: 'SET_VISIBILITY_FILTER_LOCATION',
      filter: VisibilityFilter,
    }>(),
  })
]);

export type AppAction = ADTType<typeof AppAction>