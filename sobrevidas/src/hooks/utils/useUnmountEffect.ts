import {useEffect, useCallback} from 'react';

export default function (effect: () => void) {
  const unmountEffect = useCallback(() => effect, [effect]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(unmountEffect, []);
}
