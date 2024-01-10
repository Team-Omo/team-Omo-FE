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
        queryClient.cancelQueries(['posts', postId]);
        const previousPostData: PostDetailType | undefined =
          queryClient.getQueryData(['posts', postId]);

        if (previousPostData) {
          const updatedPostDat = {
            ...previousPostData,
            likeCount: previousPostData.likeCount + 1,
          };
          queryClient.setQueryData(['posts', postId], updatedPostDat);
        }
        return { previousPostData };
      },
      onError: (err, brandId, context) => {
        queryClient.setQueryData(['post', postId], context?.previousPostData);
      },

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
