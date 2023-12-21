import { useQuery } from 'react-query';
import { instance } from '../../../apis/apis';
import { LocationPostsType } from '../../../model/interface';

export const getLocations = async (
  locationId: number | undefined,
  latitude: number | undefined,
  longitude: number | undefined,
): Promise<LocationPostsType> => {
  // const params = { latitude: String(latitude), longitude: String(longitude) };
  const params = { latitude, longitude };
  const response = await instance.get(`/locations/${locationId}`, { params });

  return response.data;
};

const useGetLocationPostsQuery = (
  locationId: number | undefined,
  latitude: number | undefined,
  longitude: number | undefined,
) =>
  useQuery(['locations', locationId], () =>
    getLocations(locationId, latitude, longitude),
  );

export default useGetLocationPostsQuery;