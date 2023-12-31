import { useMutation, useQueryClient } from 'react-query';
import authApi from '../../../axios/authApi';
import { PostContentType } from '../../../model/interface';
import toast from 'react-hot-toast';

const postContent = async (newContent: PostContentType) => {
  const formData = new FormData();
  formData.append('content', newContent.content);
  formData.append('star', String(newContent.star));
  formData.append('categoryName', newContent.categoryName);
  formData.append('storeName', newContent.storeName);
  formData.append('address', newContent.address);
  formData.append('latitude', newContent.latitude);
  formData.append('longitude', newContent.longitude);
  formData.append('placeInfoId', newContent.placeInfoId!);

  newContent.imgUrl?.forEach((file, index) => {
    formData.append('imgUrl', file);
  });

  const response = await authApi.post('/api/posts', formData);
  return response.data;
};

const usePostContentMutate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(postContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      toast.success('게시물 업로드 성공!', {
        position: 'bottom-right',
        duration: 4000,
      });
      toast.remove('10');
    },
    onMutate: () => {
      toast.loading('게시물 업로드 중입니다...', {
        position: 'bottom-right',
        duration: 4000,
        id: '10',
      });
    },
  });
  return {
    postContentMutate: mutation.mutate,
    isPostContentLoading: mutation.isLoading,
    isPostContentSuccess: mutation.isSuccess,
    isPostContentError: mutation.isLoading,
  };
};

export default usePostContentMutate;
