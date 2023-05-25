import { Types } from 'mongoose';

import { BlogDocument } from '../entities/blog.entity';
import { ISeoSetting } from '../../seo-setting/interfaces/seo-setting.interface';

export interface IBlogDocument extends Omit<BlogDocument, 'seoSetting'> {
    seoSetting: ISeoSetting;
}

export interface ICta {
    employee: Employee;
    employer: Employer;

    newsLetter: boolean;
}

export interface Employee {
    link: string;
    image: Types.ObjectId;
}

export interface Employer {
    link: string;
    image: Types.ObjectId;
}

export interface IHero {
    title: string;
    image: Types.ObjectId;
    thumbnail: Types.ObjectId;
}
