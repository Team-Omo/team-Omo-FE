import { useInfiniteQuery, useQuery } from 'react-query';
import api from '../../../axios/api';
import { PostType } from '../../../model/interface';

const getContents = async (
  districtName: string | undefined,
  categoryName: string | undefined,
  lastSeenPage: number | undefined, // 마지막 게시글 id
  page: number | undefined, // 불러올 게시글 숫자
): Promise<PostType[]> => {
  const params =
    districtName === '전체' && categoryName === '전체'
      ? {
          districtName: '',
          categoryName: '',
          lastSeenPage: lastSeenPage,
          page: page,
        }
      : districtName === '전체' && categoryName !== '전체'
      ? {
          districtName: '',
          categoryName: categoryName,
          lastSeenPage: lastSeenPage,
          page: page,
        }
      : districtName !== '전체' && categoryName === '전체'
      ? {
          districtName: districtName,
          categoryName: '',
          lastSeenPage: lastSeenPage,
          page: page,
        }
      : {
          districtName: districtName,
          categoryName: categoryName,
          lastSeenPage: lastSeenPage,
          page: page,
        };

  const response = await api.get('/api/posts', { params });

  return response.data;
};

const useGetAllContentsQuery = (
  districtName: string | undefined,
  categoryName: string | undefined,
) =>
  useInfiniteQuery(
    'posts',
    ({ pageParam }) => getContents(districtName, categoryName, pageParam, 16),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.length > 0
          ? lastPage[lastPage.length - 1].postId
          : undefined;
      },
      staleTime: 60000,
      cacheTime: 300000,
    },
  );

export default useGetAllContentsQuery;
