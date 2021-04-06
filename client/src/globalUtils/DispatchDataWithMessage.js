export default (payload, type, dispatch) => {
  dispatch({ type, payload });
  dispatch({ type, payload: { status: null, message: null } });
};