import { useQuery } from 'react-query';
import api from '../../../axios/api';
import { LocationPostsType } from '../../../model/interface';

export const getLocations = async (
  locationId: number | undefined,
  latitude: number | undefined,
  longitude: number | undefined,
): Promise<LocationPostsType> => {
  const params = { latitude, longitude };
  const response = await api.get(`/api/locations/${locationId}`, { params });
  return response.data;
};

const useGetLocationPostsQuery = (
  locationId: number | undefined,
  latitude: number | undefined,
  longitude: number | undefined,
) =>
  useQuery(
    ['locations', locationId],
    () => getLocations(locationId, latitude, longitude),
    { enabled: false, staleTime: 60000, cacheTime: 300000 },
  );

export default useGetLocationPostsQuery;
