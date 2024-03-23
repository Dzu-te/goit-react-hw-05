export const ErrorMessage = ({ error }) => {
  return (
    <p>
      Whoops, something went wrong! Please try reloading this page! Message:
      {""}
      {error}
    </p>
  );
};
