import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ObjectID } from 'bson';
import { Response } from '~/common/response/decorators/response.decorator';
@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}
    @Response('tag.create')
    @Post()
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagService.create(createTagDto);
    }
    @Response('tag.list')
    @Get()
    findAll() {
        return this.tagService.findAll();
    }

    @Response('tag.get')
    @Get(':id')
    findOne(@Param('id') id: ObjectID) {
        return this.tagService.findOne(id);
    }

    @Response('tag.update')
    @Patch(':id')
    update(@Param('id') id: ObjectID, @Body() updateTagDto: UpdateTagDto) {
        return this.tagService.update(id, updateTagDto);
    }

    @Response('tag.remove')
    @Delete(':id')
    remove(@Param('id') id: ObjectID) {
        return this.tagService.remove(id);
    }
}
