interface MovieFilterList {
  sort_by: string;
  year?: number;
  with_genres?: string;
}

interface TVFilterList {
  sort_by: string;
  first_air_date_year?: number;
  with_genres?: string;
  with_status?: string;
  with_type?: string;
}
export { type MovieFilterList, type TVFilterList };
