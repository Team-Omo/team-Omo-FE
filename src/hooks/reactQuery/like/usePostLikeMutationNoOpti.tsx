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

const usePostLikeMutationNoOpti = (postId: number | undefined) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, unknown, { postId: number | undefined }>(
    postLike,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts', postId]);
      },
      onError: () => {
        console.log('로그인 후 이용해주세요.');
      },
    },
  );
  return {
    postMutate: mutation.mutate,
    isPostLoading: mutation.isLoading,
  };
};

export default usePostLikeMutationNoOpti;
