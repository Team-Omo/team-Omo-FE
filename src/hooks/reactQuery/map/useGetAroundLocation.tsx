import { useQuery } from 'react-query';
import api from '../../../axios/api';

const fetchLocations = async (
  categoryName: string,
  qa: string,
  pa: string,
  ha: string,
  oa: string,
) => {
  const response = await api.get(
    `/api/locations?categoryName=${categoryName}&qa=${qa}&pa=${pa}&ha=${ha}&oa=${oa}`,
  );
  return response.data;
};

const useLocationQuery = (
  categoryName: string,
  qa: string,
  pa: string,
  ha: string,
  oa: string,
) => {
  return useQuery(
    ['locations', categoryName, qa, pa, ha, oa],
    () => fetchLocations(categoryName, qa, pa, ha, oa),
    {
      keepPreviousData: true,
      enabled:
        oa === undefined &&
        ha === undefined &&
        pa === undefined &&
        qa === undefined,
    },
  );
};

export default useLocationQuery;
