import { useQuery } from 'react-query';
import api from '../../../axios/api';
import { LocationType } from '../../../model/interface';

export const getLocations = async (
  categoryName: string | null,
  ha: number | null,
  oa: number | null,
  pa: number | null,
  qa: number | null,
): Promise<LocationType[]> => {
  const params = { categoryName, qa, pa, ha, oa };
  const response = await api.get(`/api/locations`, { params });
  return response.data.location || response.data;
};

const useGetLookAroundQuery = (
  categoryName: string | null,
  ha: number | null,
  oa: number | null,
  pa: number | null,
  qa: number | null,
) =>
  useQuery('Locations', () => getLocations(categoryName, oa, ha, pa, qa), {
    enabled: oa !== null && ha !== null && pa !== null && qa !== null,
  });

export default useGetLookAroundQuery;
