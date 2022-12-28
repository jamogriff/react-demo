import { SyntheticEvent } from "react";

export interface ToDo {
  id: number;
  title: string;
  isComplete: boolean;
  isInEditMode: boolean;
}

// @t2 types and generics
// Example here: https://freshman.tech/snippets/typescript/fix-value-not-exist-eventtarget/
// This type isn't implemented since it cannot handle a KeyDownEvent
export type ElementTargetedReactEvent<Type extends Element> =
  SyntheticEvent & {
    target: Type;
  };