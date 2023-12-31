import { QueryClient, useQuery } from 'react-query';
import { RecentPostsType } from '../../../model/interface';
import api from '../../../axios/api';

const queryClient = new QueryClient();

export const getRecentPosts = async (
  districtName: string | undefined,
  categoryName: string,
): Promise<RecentPostsType[]> => {
  const params = {
    districtName: districtName !== '전체' ? districtName : '',
    categoryName: categoryName !== '전체' ? categoryName : '',
    limit: 16,
  };
  const response = await api.get(`/api/main/recent`, { params });
  return response.data;
};

const useGetRecentPostsQuery = (
  districtName: string | undefined,
  categoryName: string,
) =>
  useQuery('recentPosts', () => getRecentPosts(districtName, categoryName), {
    onSuccess: () => {
      queryClient.invalidateQueries('recentPosts');
    },
  });

export default useGetRecentPostsQuery;
