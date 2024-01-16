import { BookmarkLocationType } from '../../model/interface';

export interface ButtonProps {
  color: 'red' | 'blue';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

export interface StarButtonProps {
  starNum: number;
  onClick: (star: number) => void;
}

export interface BookMarkButtonProps {
  activateBookmarkHandler: () => void;
  deActivateBookmarkHandler: () => void;
  getBookmarkLoading?: boolean;
  getBookmarkFetching?: boolean;
  data?: BookmarkLocationType[] | undefined;
  locationId?: number | undefined;
  position: `map` | `info`;
}

export interface FillButtonProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  size: 'sm' | 'md' | 'lg';
  color: 'gray' | 'blue' | 'primary';
}
