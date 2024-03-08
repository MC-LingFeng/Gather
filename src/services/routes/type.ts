export interface RouteApi {
  id: number;
  sort: number;
  name: string;
  path: string;
  father_path: string | null;
  children: RouteApi[] | [];
}
