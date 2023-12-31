import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostDetailType } from '../../../model/interface';
import toast from 'react-hot-toast';

const deleteBookmark = async (locationId: number | undefined) => {
  const response = await authApi.delete(`/api/posts/${locationId}/bookmark`);
  return response.data;
};

const useDeleteBookmarkMutation = (locationId: number | undefined) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    void,
    unknown,
    { locationId: number | undefined }
  >(() => deleteBookmark(locationId), {
    onMutate: async () => {
      queryClient.cancelQueries('bookmarkPlaces');
      const previousLocationData = queryClient.getQueryData('bookmarkPlaces');

      if (previousLocationData) {
        queryClient.setQueryData(['bookmarkPlaces'], previousLocationData);
      }
      return { previousLocationData };
    },
    onSuccess: () => {
      toast.success('북마크가 삭제되었습니다.', {
        position: 'bottom-right',
        duration: 4000,
      });
    },
    onError: (err, brandId, context) => {
      queryClient.setQueryData('bookmarkPlaces', context?.previousLocationData);
      toast.error('북마크 삭제에 실패했습니다.', {
        position: 'bottom-right',
        duration: 4000,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries('bookmarkPlaces');
    },
  });
  return {
    deletebookmarkingMutate: mutation.mutate,
    isDeleteBookmarkingLoading: mutation.isLoading,
  };
};

export default useDeleteBookmarkMutation;
