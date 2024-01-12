import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostDetailType } from '../../../model/interface';

const postLike: MutationFunction<
  void,
  { postId: number | undefined }
> = async ({ postId }) => {
  const response = await authApi.post(`/api/posts/${postId}/like`);
  return response.data;
};

const usePostLikeMutation = (postId: number | undefined) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, unknown, { postId: number | undefined }>(
    postLike,
    {
      onMutate: async ({ postId }) => {
        // 진행중인 refetch가 있다면 취소시킨다.
        queryClient.cancelQueries(['posts', postId]);

        // 이전 데이터를 저장해둔다.
        const previousPostData: PostDetailType | undefined =
          queryClient.getQueryData(['posts', postId]);

        // 미리 UI에 적용시켜 놓음.
        if (previousPostData) {
          const updatedPostData = {
            ...previousPostData,
            likeCount: previousPostData.likeCount + 1,
          };
          queryClient.setQueryData(['posts', postId], updatedPostData);
        }
        return { previousPostData };
      },

      // 에러가 발생할 경우 이전 데이터로 롤백시킨다.
      onError: (err, brandId, context) => {
        queryClient.setQueryData(['post', postId], context?.previousPostData);
      },

      // 성공하거나 실패할 경우 쿼리를 무효화시켜 최신 데이터를 받아와준다.
      onSettled: () => {
        queryClient.invalidateQueries(['posts', postId]);
      },
    },
  );
  return {
    postMutate: mutation.mutate,
    isPostLoading: mutation.isLoading,
  };
};

export default usePostLikeMutation;
