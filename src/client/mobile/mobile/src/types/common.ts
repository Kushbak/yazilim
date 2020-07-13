// types/common

import { NavigationScreenProp, NavigationRoute, NavigationParams } from "react-navigation";

export interface NavProps {
  navigation: NavigationScreenProp<NavigationRoute<NavigationParams>, NavigationParams>;
}

export interface PageProps extends NavProps {

}

export interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  faculty?: any
}

export interface IAuthor {
  id: number;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  posters: IUserPoster[];
  faculty: {id: number};
  images: IImage[];
}

export interface IDepartment{
  faculty:{
    id: number;
  }
}

export interface IComment{
  id: number;
}

export interface IImage {
  url: string;
}

export interface IUserPoster{
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  images: IImage[];
}

export interface IPoster{
  id: number;
  title: string;
  descripttion: string;
  publishedAt: string;
  author: IAuthor;
  department?: IDepartment;
  comments: IComment[];
  cost?: number;
  rating: number;
  images?: IImage[];
}

export type BottomNavType = 'Home' | 'Favorite' | 'Post' | 'Chat' | 'Profile';

export type TopNavType = 'News' | 'EmergencyNews';
