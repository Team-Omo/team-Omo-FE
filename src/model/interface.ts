export interface SelectedInfoType {
  placeName: string;
  addressName: string;
  categoryName: string;
  latitude: string;
  longitude: string;
}

export interface MapLocationType {
  center: {
    lat: number | null;
    lng: number | null;
  };
  isPanto: boolean;
  bounds: BoundsType | null;
}

export interface MapCurrentLocationType {
  lat: number | null;
  lng: number | null;
  placeName: string | null;
}

export interface BoundsType {
  ha: number;
  oa: number;
  pa: number;
  qa: number;
}

export interface ThemeType {
  toggleTheme: () => void;
  themeMode: string | null;
}

// 여기부터 실제 서버 타입
export interface PostType {
  User: {
    nickname: string;
  };
  Category: {
    categoryName: string;
  };
  Location: {
    locationId: number;
    storeName: string;
    address: string;
    starAvg: number;
  };
  postId: number;
  imgUrl: string[];
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export interface PostDetailType {
  postId: number;
  content: string;
  createdAt: string;
  likeCount: number;
  imgUrl: string[];
  star: number;
  User: {
    nickname: string;
    imgUrl: string;
    userId: number;
  };
  Location: LocationType;
  Comments: CommentType[];
}

export interface RepleType {
  replyId: number;
  content: string;
  createdAt: string;
  User: {
    imgUrl: string;
    nickname: string;
    userId: number;
  };
}

export interface CommentType {
  Replies: RepleType[];
  commentId: number;
  content: string;
  createdAt: string;
  User: {
    imgUrl: string;
    nickname: string;
    userId: number;
  };
}

export interface HotPostsType {
  Category: { categoryName: string };
  Location: {
    address: string;
    latitude: number;
    locationId: number;
    longitude: number;
    placeInfoId: string;
    postCount: 1;
    starAvg: 0;
    storeName: string;
  };
  content: string;
  imgUrl: string[];
}

export interface RecentPostsType {
  User: { nickname: string };
  commentCount: number;
  content: string;
  createdAt: string;
  imgUrl: string[];
  likeCount: number;
  postId: number;
}

export interface CommentPostsType {
  Post: { Location: { address: string } };
  PostId: number;
  content: string;
  createdAt: string;
}

export interface LocationType {
  Category: { categoryName: string };
  Posts: { postId: number; imgUrl: string; star: number | undefined }[];
  address: string;
  distance: number;
  locationId: number;
  latitude: number;
  longitude: number;
  starAvg: number;
  postCount: number;
  storeName: string;
  placeInfoId: string;
}

export interface PostContentType {
  content: string;
  categoryName: string;
  imgUrl?: File[];
  storeName: string;
  address: string;
  latitude: string;
  longitude: string;
  star: number;
  placeInfoId: string | null | undefined;
}

export interface PostPatchType {
  address: string;
  content: string;
  star: number;
  storeName: string;
  placeInfoId: string | undefined | null;
}

export interface PostCommentType {
  PostId: number | undefined;
  content: string;
}

export interface CommentType {
  User: {
    userId: number;
    imgUrl: string;
    nickname: string;
  };
  commentId: number;
  content: string;
  createdAt: string;
}

export interface LocationPostType {
  User: { imgUrl: string; nickname: string };
  commentCount: number;
  content: string;
  createdAt: string;
  imgUrl: string[];
  likeCount: number;
  postId: number;
  star: number;
}

export interface LocationPostsType {
  location: {
    Posts: [{ imgUrl: string | undefined }];
    address: string;
    locationId: number;
    placeInfoId: string;
    postCount: number;
    starAvg: number;
    storeName: string;
  };
  posts: LocationPostType[];
}

export interface BookmarkLocationType {
  Location: {
    latitude: string;
    locationId: number;
    longitude: string;
  };
}

export interface LikePostsType {
  PostId: number;
  userId: number;
  likeId: number;
}

// 여기부터 구글 맵

// 현위치
export interface CurrentLocationType {
  lat: number | null;
  lng: number | null;
}

export interface mapBoundsType {
  initialLoad?: boolean | undefined;
  northEast: { lat: number | undefined; lng: number | undefined };
  southWest: { lat: number | undefined; lng: number | undefined };
}

export interface SelectedPlaceType {
  locationId: number;
  latitude: number;
  longitude: number;
}

// 검색 결과 타입
export interface UserSearchType {
  userId: number;
  nickname: string;
  imgUrl: string;
}

export interface StoreSearchType {
  Category: {
    categoryName: string;
  };
  Location: {
    address: string;
    latitude: string;
    longitude: string;
    locationId: number;
    placeInfoId: string;
    postCount: number;
    starAvg: number;
    storeName: string;
  };
  commentCount: number;
  content: string;
  likeCount: number;
  postId: number;
  star: number;
  User: {
    userId: number;
    nickname: string;
  };
}

//신규 댓글 타입
export interface CommentTypeNew {
  Post: { postId: number };
  User: { imgUrl: string; nickname: string; userId: number };
  commentId: number;
  content: string;
  createdAt: string;
  replyCount: number;
}

export interface RepleTypeNew {
  Comment: { commentId: number; replyCount: number };
  User: { nickname: string; imgUrl: string; userId: number };
  content: string;
  createdAt: string;
  replyId: number;
}
