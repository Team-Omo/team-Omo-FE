import { useQuery } from 'react-query';
import authApi from '../../../axios/authApi';

const getLikes = async () => {
  const response = await authApi.get(`/users/posts/like`);
  return response.data;
};

const useGetLikeQuery = () => useQuery('bookmarkPlaces', getLikes);

export default useGetLikeQuery;
