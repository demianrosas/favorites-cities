export const HAS_ERROR = "HAS_ERROR";

export const hasError = () => {
  return {
    type: HAS_ERROR,
    payload: {},
  };
};
