import React from "react";
import _ from "lodash";

const useThrottle = (cb, delay) => {
  //   const options = { leading: true, trailing: false };
  const cbRef = useRef(cb);
  // use mutable ref to make useCallback/throttle not depend on `cb` dep
  useEffect(() => {
    cbRef.current = cb;
  });
  return useCallback(
    _.throttle((...args) => cbRef.current(...args), delay, options),
    [delay]
  );
};
