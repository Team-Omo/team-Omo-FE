import axios from 'axios';
import { useQuery } from 'react-query';
import { ContentType } from '../model/interface';

export const getHotContents = async (): Promise<ContentType[]> => {
  const response = await axios.get('http://localhost:3001/contents');
  return response.data;
};

const useGetHotContentsQuery = () => useQuery('hotContents', getHotContents);

export default useGetHotContentsQuery;