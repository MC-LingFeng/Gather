import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import useUnmounted from './useUnmounted';

function useSafeState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>];

function useSafeState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
];

function useSafeState<S>(initialState?: S | (() => S)) {
  const unmountedRef: { current: boolean } = useUnmounted();
  const [state, setState] = useState(initialState);

  const setCurrentState = useCallback((currentState: any) => {
    if (unmountedRef.current) return;
    setState(currentState);
  }, []);

  return [state, setCurrentState] as const;
}

export default useSafeState;
