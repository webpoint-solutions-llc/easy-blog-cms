import React from 'react';

import { toast } from 'react-toastify';

import CTAIcon from '@atoms/icons/CTA-Icon';
import AudioIcon from '@atoms/icons/Audio-Icon';
import ImageIcon from '@atoms/icons/Image-Icon';
import TitleIcon from '@atoms/icons/Title-Icon';
import VideoIcon from '@atoms/icons/Video-Icon';
import FAQAddIcon from '@atoms/icons/FAQAdd-Icon';
import ParagraphIcon from '@atoms/icons/Paragraph-Icon';
import EmbedModal from '@organisms/BlogBuilder/EmbedModal';
import InfographicIcon from '@atoms/icons/Infographics-Icon';
import { IBlog } from '@particles/interface/blogEditContent.interface';

import { blogType } from '../const';

const AddContentBlogBuilder: React.FC<Partial<IBlog>> = ({ setContent }) => {
  const [embedModal, setEmbedModal] = React.useState<boolean | string>(false);

  const addComponent = (type: string) => {
    let content: any = '';

    if (type === blogType.employeeCta || type === blogType.employerCta) {
      content = {
        link: '/employee-signup',
        image: '',
      };
    }

    if (setContent) {
      setContent((prevValue) => {
        return {
          ...prevValue,
          body: [
            ...prevValue.body,
            {
              order: prevValue.body.length,
              type: type,
              data: content,
            },
          ],
        };
      });
    }
  };

  const embedLinkAdd = (link: string) => {
    if (setContent) {
      setContent((prevValue) => {
        return {
          ...prevValue,
          body: [
            ...prevValue.body,
            {
              order: prevValue.body.length,
              type: 'embed',
              data: link,
            },
          ],
        };
      });
    }
  };

  return (
    <main className="w-full py-6 border border-dashed border-link flex justify-center items-center bg-content-bg mt-4 rounded">
      <div className="grid grid-cols-4 gap-4">
        <div
          className="py-[27px] rounded-lg hover:bg-white hover:text-link hover:shadow-selector flex flex-col justify-center items-center cursor-pointer gap-3 px-[35px]"
          onClick={() => addComponent(blogType.title)}
        >
          <TitleIcon />
          <span className="text-button text-neutral-600">Title</span>
        </div>
        <div
          className="py-[27px] rounded-lg hover:bg-white hover:shadow-selector flex flex-col justify-center items-center cursor-pointer gap-3 px-[35px]"
          onClick={() => addComponent(blogType.paragraph)}
        >
          <ParagraphIcon />
          <span className="text-button text-neutral-600">Paragraph</span>
        </div>
        <div
          className="py-[27px] rounded-lg hover:bg-white hover:shadow-selector flex flex-col justify-center items-center cursor-pointer gap-3 px-[35px]"
          onClick={() => addComponent(blogType.employerCta)}
        >
          <CTAIcon />
          <span className="text-button text-neutral-600">Employer CTA</span>
        </div>
        <div
          className="py-[27px] rounded-lg hover:bg-white hover:shadow-selector flex flex-col justify-center items-center cursor-pointer gap-3 px-[35px]"
          onClick={() => addComponent(blogType.employeeCta)}
        >
          <CTAIcon />
          <span className="text-button text-neutral-600">Employee CTA</span>
        </div>
        <div
          className="py-[27px] rounded-lg hover:bg-white hover:shadow-selector flex flex-col justify-center items-center cursor-pointer gap-3 px-[35px]"
          onClick={() => addComponent(blogType.image)}
        >
          <ImageIcon />
          <span className="text-button text-neutral-600">Image</span>
        </div>
        <div
          className="py-[27px] rounded-lg hover:bg-white hover:shadow-selector flex flex-col justify-center items-center cursor-pointer gap-3 px-[35px]"
          onClick={() => setEmbedModal('Embed video')}
        >
          <VideoIcon />
          <span className="text-button text-neutral-600">Embed Video</span>
        </div>
        {/* This is temporarily removed! */}
        <div
          className="py-[27px] rounded-lg hover:bg-white hover:shadow-selector flex flex-col justify-center items-center cursor-pointer gap-3 px-[35px]"
          onClick={() => setEmbedModal('Embed audio')}
        >
          <AudioIcon />
          <span className="text-button text-neutral-600">Embed Audio</span>
        </div>
        <div
          className="py-[27px] rounded-lg hover:bg-white hover:shadow-selector flex flex-col justify-center items-center cursor-pointer gap-3 px-[35px]"
          onClick={() => {
            if (setContent) {
              setContent((prevValue) => {
                return {
                  ...prevValue,
                  infographic: {},
                };
              });
            }
          }}
        >
          <InfographicIcon />
          <span className="text-button text-neutral-600">Infographics</span>
        </div>
        <div
          className="py-[27px] rounded-lg hover:bg-white hover:shadow-selector flex flex-col justify-center items-center cursor-pointer gap-3 px-[35px]"
          onClick={() => {
            addComponent('faq');
            toast('Remember to add question as h2 and answer as normal!', { type: 'info' });
          }}
        >
          <FAQAddIcon />
          <span className="text-button text-neutral-600">FAQ</span>
        </div>
      </div>
      {embedModal && <EmbedModal saveValue={embedLinkAdd} title={embedModal as string} toggleModal={setEmbedModal} />}
    </main>
  );
};

export default AddContentBlogBuilder;
