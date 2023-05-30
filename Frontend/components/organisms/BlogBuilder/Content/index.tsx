import React from 'react';

import clsx from 'clsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { blogType } from './const';
import BlogBuilderCTA from './CTA';
import ReactQuillEditor from '@atoms/editor';
import BlogBuilderImage from './ImageContent';
import BlogBuilderEmbed from './EmbedComponent';
import AddContentBlogBuilder from './AddContent';
import BlogBuilderInfographics from './infographics';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';

import { IBlog } from '@particles/interface/blogEditContent.interface';
import ImageSelector from '../imageSelector';
import { MediaList } from '@particles/interface/blogContent.interface';

interface IDraggableProps {
  children: React.ReactNode;
  index: string;
  id: number;
}

export interface IImageSelector {
  status: boolean;
  index: number | null;
  function(file: MediaList): void;
}

const BlogBuilderContent: React.FC<IBlog> = ({ content, setContent }) => {
  const [showAddComponent, setShowAddComponent] = React.useState(false);
  const [imageSelector, setImageSelector] = React.useState<IImageSelector>({
    status: false,
    index: null,
    function: (file) => {
      return;
    },
  });

  const blogContentData = content.body.slice(1);

  const removeContent = (index: number) => {
    setContent((prevValue) => {
      let updatedBody = [...prevValue.body];

      updatedBody = updatedBody.filter((value, dataIndex) => {
        return index !== dataIndex;
      });

      updatedBody = updatedBody.map((value, dataIndex) => {
        return {
          ...value,
          order: dataIndex + 1,
        };
      });

      return {
        ...prevValue,
        body: updatedBody,
      };
    });
  };

  function onDragEnd(result: any) {
    // if drop to same index point
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const latestBlogContentData = content.body.slice(1);
    const tldrContent = content.body[0];

    let items = Array.from(latestBlogContentData);
    // get source
    const [reorderedItem] = items.splice(result.source.index, 1);

    // replace with index
    items.splice(result.destination.index, 0, reorderedItem);

    // rearrange order excluding TLDR
    items = items.map((row, index) => {
      row.order = index;

      return row;
    });

    // adding with TLDR
    setContent((prev) => ({ ...prev, body: [tldrContent, ...items] }));
  }

  const DragableComponent = ({ children, index, id }: IDraggableProps) => {
    return (
      <Draggable draggableId={index} index={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            {children}
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="blogbuilder">
          {(provided) => (
            <main className="w-full" ref={provided.innerRef} {...provided.droppableProps}>
              {blogContentData.map((contentVal, index) => {
                if (
                  contentVal.type === blogType.title ||
                  contentVal.type === blogType.paragraph ||
                  contentVal.type === 'faq'
                ) {
                  return (
                    <DragableComponent index={`editor-${index}`} id={index} key={`editor-${index}`}>
                      <div className={clsx(contentVal.type === blogType.paragraph ? 'mt-4' : 'mt-14', 'relative')}>
                        <div
                          className="absolute w-6 h-6 rounded-full bg-error -right-[12px] -top-[12px] flex items-center justify-center cursor-pointer"
                          onClick={() => removeContent(index + 1)}
                        >
                          <StaticPlusIcon className="w-[14px] text-white rotate-45" />
                        </div>
                        <ReactQuillEditor
                          initialValue={contentVal.data}
                          placeholder={
                            contentVal.type === blogType.paragraph
                              ? 'Enter paragraph'
                              : contentVal.type === blogType.title
                              ? 'Enter Header'
                              : 'Enter FAQ'
                          }
                          setCurrentValue={(value) => {
                            // value is the same as the previous one, don't update the state
                            if (!value) return;
                            if (value === content.body[index + 1].data) return;

                            setContent((prevValue) => {
                              const updatedBody = [...prevValue.body];
                              updatedBody[index + 1] = {
                                ...prevValue.body[index + 1],
                                data: value,
                              };

                              prevValue['body'] = updatedBody;

                              return prevValue;
                            });
                          }}
                        />
                      </div>
                    </DragableComponent>
                  );
                }

                if (contentVal.type === blogType.employeeCta || contentVal.type === blogType.employerCta) {
                  return (
                    <DragableComponent index={`cta-${index}`} id={index} key={`editor-${index}`}>
                      <div key={`cta-${index}`} className="mt-14 relative">
                        <div
                          className="absolute w-6 h-6 rounded-full bg-error -right-[12px] -top-[12px] flex items-center justify-center cursor-pointer z-10"
                          onClick={() => removeContent(index + 1)}
                        >
                          <StaticPlusIcon className="w-[14px] text-white rotate-45" />
                        </div>
                        <BlogBuilderCTA
                          data={contentVal.data}
                          setContent={setContent}
                          content={content}
                          index={index + 1}
                          openImageSelector={setImageSelector}
                        />
                      </div>
                    </DragableComponent>
                  );
                }

                if (contentVal.type === blogType.image) {
                  return (
                    <DragableComponent index={`image-${index}`} key={`image-${index}`} id={index}>
                      <div className="relative mt-6" key={`image-${index}`}>
                        <div
                          className="absolute w-6 h-6 rounded-full bg-error -right-[12px] -top-[12px] flex items-center justify-center cursor-pointer z-10"
                          onClick={() => removeContent(index + 1)}
                        >
                          <StaticPlusIcon className="w-[14px] text-white rotate-45" />
                        </div>
                        <BlogBuilderImage
                          setContent={setContent}
                          index={index + 1}
                          content={content}
                          openImageSelector={setImageSelector}
                        />
                      </div>
                    </DragableComponent>
                  );
                }

                if (contentVal.type === blogType.audio || contentVal.type === blogType.video) {
                  return (
                    <DragableComponent index={`audio-${index}`} id={index} key={`editor-${index}`}>
                      <div key={`audio-${index}`} className="relative mt-6">
                        <div
                          className="absolute w-6 h-6 rounded-full bg-error -right-[12px] -top-[12px] flex items-center justify-center cursor-pointer z-10"
                          onClick={() => removeContent(index + 1)}
                        >
                          <StaticPlusIcon className="w-[14px] text-white rotate-45" />
                        </div>
                        <BlogBuilderEmbed data={contentVal.data as string} />
                      </div>
                    </DragableComponent>
                  );
                }

                return <></>;
              })}

              {provided.placeholder}

              {typeof content.infographic !== 'undefined' && (
                <div className="relative mt-4">
                  <div
                    className="absolute w-6 h-6 rounded-full bg-error -right-[12px] -top-[12px] flex items-center justify-center cursor-pointer z-10"
                    onClick={() =>
                      setContent((prevVal) => ({
                        ...prevVal,
                        infographic: undefined,
                      }))
                    }
                  >
                    <StaticPlusIcon className="w-[14px] text-white rotate-45" />
                  </div>
                  <BlogBuilderInfographics image={content.infographic.file?.completedUrl} setContent={setContent} />
                </div>
              )}

              {/* Add New Section */}
              <div className="w-full border border-dashed border-link flex items-center justify-center py-2 rounded mt-4">
                <button
                  className="bg-link flex gap-2 px-[12px] py-[9px] rounded"
                  onClick={() => setShowAddComponent((prevVal) => !prevVal)}
                >
                  <StaticPlusIcon className="w-5 text-white" />
                  <span className="text-caption text-white">Add Section</span>
                </button>
              </div>
            </main>
          )}
        </Droppable>
      </DragDropContext>
      {(showAddComponent || blogContentData.length === 0) && <AddContentBlogBuilder setContent={setContent} />}
      {/* This is for the image selector inside the blog body */}
      {imageSelector.status && (
        <ImageSelector
          toggleImageSelector={() =>
            setImageSelector((prevVal) => ({
              ...prevVal,
              status: false,
            }))
          }
          contentSet={(file) => {
            imageSelector.function(file);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default BlogBuilderContent;
