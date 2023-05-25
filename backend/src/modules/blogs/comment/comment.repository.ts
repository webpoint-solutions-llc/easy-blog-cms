import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Comment, CommentDocument } from './entities/comment.entity';
import { EntityRepository } from '~/common/database/entity.repository';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';

@Injectable()
export class CommentRepository extends EntityRepository<CommentDocument> {
    constructor(
        @DatabaseEntity(Comment.name)
        commentModel: Model<CommentDocument>
    ) {
        super(commentModel);
    }
}
