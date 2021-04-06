//________________________Helper functions____________________

// Filter text length
export const cut = (source, size) => {
  return source.length > size ? source.slice(0, size - 1) + '…' : source;
};

// Return Spinner/JSX according to condition
export const loadingProcess = (loading, spinner, markUp = '') => {
  if (loading) {
    return spinner;
  }
  return markUp;
}; 
