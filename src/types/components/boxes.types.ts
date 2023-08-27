export interface BoxContent {
  key: number;
  title: string;
  container: JSX.Element;
}

export interface BoxesProps {
  contents: BoxContent[];
}
