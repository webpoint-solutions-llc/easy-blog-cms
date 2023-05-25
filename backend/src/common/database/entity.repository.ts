import { ObjectId } from 'bson';
import {
    ClientSession,
    Document,
    FilterQuery,
    Model,
    PopulateOptions,
    Types,
    UpdateQuery,
} from 'mongoose';
import {
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
} from './database.interface';
import { DATABASE_DELETED_AT_FIELD_NAME } from './constants/database.constant';

export abstract class EntityRepository<T extends Document> {
    constructor(
        protected readonly _repository: Model<T>,
        protected _joinOnFind?: PopulateOptions | PopulateOptions[]
    ) {}

    async findOne(
        entityFilterQuery: FilterQuery<T>,
        projection?: Record<string, unknown>
    ): Promise<T | null> {
        return this._repository
            .findOne(entityFilterQuery, {
                _id: 0,
                __v: 0,
                ...projection,
            })
            .exec();
    }

    async findOnePopulate(
        find: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<T> {
        const findOne = this._repository.findOne(find);

        if (options?.select) {
            findOne.select(options.select);
        }

        if (options?.join) {
            findOne.populate(
                typeof options.join === 'boolean'
                    ? this._joinOnFind
                    : (options.join as PopulateOptions | PopulateOptions[])
            );
        }

        return findOne.lean() as any;
    }

    async findOneById<Y = T>(
        entityFilterQuery: FilterQuery<T>,
        options?: IDatabaseFindAllOptions
    ): Promise<Y> {
        const findOne = this._repository.findById(entityFilterQuery);

        // Future use - To handle Model with deteleAt property
        // if (options?.withDeleted) {
        //     findOne.or([
        //         {
        //             [DATABASE_DELETED_AT_FIELD_NAME]: { $exists: false },
        //         },
        //         {
        //             [DATABASE_DELETED_AT_FIELD_NAME]: { $exists: true },
        //         },
        //     ]);
        // } else {
        //     findOne.where(DATABASE_DELETED_AT_FIELD_NAME).exists(false);
        // }

        if (options?.select) {
            findOne.select(options.select);
        }

        if (options?.join) {
            findOne.populate(
                typeof options.join === 'boolean'
                    ? this._joinOnFind
                    : (options.join as PopulateOptions | PopulateOptions[])
            );
        }

        return findOne.lean();
    }

    async findById(
        entityFilterQuery: FilterQuery<T>,
        projection?: Record<string, unknown>
    ): Promise<T | null> {
        return this._repository
            .findById(entityFilterQuery, {
                _id: 0,
                __v: 0,
                ...projection,
            })
            .exec();
    }

    async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
        return this._repository.find(entityFilterQuery);
    }

    async total(find?: Record<string, any>): Promise<number> {
        return this._repository.countDocuments(find);
    }

    async paginate(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<any | null> {
        const instance = this._repository.find(find);

        if (
            options &&
            options.limit !== undefined &&
            options.skip !== undefined
        ) {
            instance.limit(options.limit).skip(options.skip);
        }

        if (options && options.sort) {
            instance.sort(options.sort);
        }
        if (options?.join) {
            instance.populate(
                typeof options.join === 'boolean'
                    ? this._joinOnFind
                    : (options.join as PopulateOptions | PopulateOptions[])
            );
        }

        return instance.lean();
    }

    async create(createEntityData: unknown): Promise<T> {
        const entity = await new this._repository(createEntityData);

        return await entity.save();
    }

    async findOneAndUpdate(
        entityFilterQuery: FilterQuery<T>,
        updateEntityData: UpdateQuery<unknown>
    ): Promise<T | null> {
        return this._repository.findOneAndUpdate(
            entityFilterQuery,
            updateEntityData,
            {
                useFindAndModify: false,
                new: true,
            }
        );
    }

    async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
        const deleteResult = await this._repository.deleteMany(
            entityFilterQuery
        );
        return deleteResult.deletedCount >= 1;
    }

    async deleteOne(
        find: Record<string, any> | Record<string, any>[]
    ): Promise<T> {
        const del = this._repository.findOneAndDelete(find);

        return del;
    }

    async deleteOneById(_id: ObjectId, options?: any): Promise<T> {
        const del = this._repository.findByIdAndDelete(_id, {
            new: true,
        });

        if (options?.join) {
            del.populate(
                typeof options.join === 'boolean'
                    ? this._joinOnFind
                    : (options.join as PopulateOptions | PopulateOptions[])
            );
        }

        if (options?.session) {
            del.session(options.session);
        }

        return del;
    }

    async softDeleteOneById(_id: ObjectId, options?: any): Promise<T> {
        const del = this._repository.findByIdAndUpdate(
            _id,
            { isDeleted: true },
            {
                new: true,
            }
        );

        if (options?.join) {
            del.populate(
                typeof options.join === 'boolean'
                    ? this._joinOnFind
                    : (options.join as PopulateOptions | PopulateOptions[])
            );
        }

        if (options?.session) {
            del.session(options.session);
        }

        return del;
    }
}
