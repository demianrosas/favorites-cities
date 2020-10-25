export const HAS_ERROR = "HAS_ERROR";

export const hasError = (err) => {
  return {
    type: HAS_ERROR,
    payload: {},
  };
};
