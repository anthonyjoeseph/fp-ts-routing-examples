import { Eq, fromEquals } from "fp-ts/lib/Eq";
import { Prism } from "monocle-ts";

export type CodegenLocation = {
  readonly type: "Home";
} | {
  readonly type: "About";
} | {
  readonly type: "Topics";
} | {
  readonly type: "TopicsID";
  readonly value0: string;
} | {
  readonly type: "NotFound";
};

export const home: CodegenLocation = { type: "Home" };

export const about: CodegenLocation = { type: "About" };

export const topics: CodegenLocation = { type: "Topics" };

export function topicsID(value0: string): CodegenLocation { return { type: "TopicsID", value0 }; }

export const notFound: CodegenLocation = { type: "NotFound" };

export function fold<R>(handlers: {
  onHome: () => R;
  onAbout: () => R;
  onTopics: () => R;
  onTopicsID: (value0: string) => R;
  onNotFound: () => R;
}): (fa: CodegenLocation) => R { return fa => { switch (fa.type) {
  case "Home": return handlers.onHome();
  case "About": return handlers.onAbout();
  case "Topics": return handlers.onTopics();
  case "TopicsID": return handlers.onTopicsID(fa.value0);
  case "NotFound": return handlers.onNotFound();
} }; }

export const _Home: Prism<CodegenLocation, CodegenLocation> = Prism.fromPredicate(s => s.type === "Home");

export const _About: Prism<CodegenLocation, CodegenLocation> = Prism.fromPredicate(s => s.type === "About");

export const _Topics: Prism<CodegenLocation, CodegenLocation> = Prism.fromPredicate(s => s.type === "Topics");

export const _TopicsID: Prism<CodegenLocation, CodegenLocation> = Prism.fromPredicate(s => s.type === "TopicsID");

export const _NotFound: Prism<CodegenLocation, CodegenLocation> = Prism.fromPredicate(s => s.type === "NotFound");

export function getEq(eqTopicsIDValue0: Eq<string>): Eq<CodegenLocation> { return fromEquals((x, y) => { if (x.type === "Home" && y.type === "Home") {
  return true;
} if (x.type === "About" && y.type === "About") {
  return true;
} if (x.type === "Topics" && y.type === "Topics") {
  return true;
} if (x.type === "TopicsID" && y.type === "TopicsID") {
  return eqTopicsIDValue0.equals(x.value0, y.value0);
} if (x.type === "NotFound" && y.type === "NotFound") {
  return true;
} return false; }); }