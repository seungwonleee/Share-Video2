import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// 페이지 이동시 최상위 고정
const ScrollToTop = () => {
  let history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
};

export default ScrollToTop;
