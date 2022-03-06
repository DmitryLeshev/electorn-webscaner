import { useLocation } from "react-router-dom";

export const useGetParameter = (name: string) => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  return query.get(name);
};
