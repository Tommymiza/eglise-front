export type HeaderColumn<T> = {
  id: string;
  header: string;
  Cell?: (props: { row: T }) => JSX.Element;
};
