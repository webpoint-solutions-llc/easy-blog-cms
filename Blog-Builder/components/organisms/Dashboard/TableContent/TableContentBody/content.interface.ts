import React from 'react';
import { IThreeDotsOptions } from '../ThreeDotOption';
import { IconFunctionType } from '@atoms/icons/iconFunctionType.interface';

export interface ITableContentBody {
  heading: string[];
  includeId: boolean;
  content: (number | JSX.Element | string | string[] | IThreeDotsOptions[] | ITableContentButton[])[][];
  tableControlType: TableControlType;
}

export interface ITableContentButton {
  icon: React.FC<IconFunctionType>;
  link?: string;
  params?: {
    key: string;
    value: string;
  }[];
  onClick?: React.MouseEvent;
  danger?: boolean;
  deleteModal?: boolean;
  Modal?: (closeModal: React.Dispatch<React.SetStateAction<boolean>>) => void;
  deleteModalFunction?: () => void;
  view?: boolean;
}

export interface IContentPosts {
  id: number;
  title: JSX.Element | string;
  keyword: string | string[];
  categories: string | string[];
  tags: string;
  author: string;
  datePublished: string;
  controller: IThreeDotsOptions[];
}

export enum TableControlType {
  tripleDot = 'dot',
  button = 'btn',
  none = 'none',
}
