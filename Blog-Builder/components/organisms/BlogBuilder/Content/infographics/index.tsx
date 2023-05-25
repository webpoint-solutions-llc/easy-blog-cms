import React from 'react';

import { IBlog } from '@particles/interface/blogEditContent.interface';
import LinkVariantIcon from '@atoms/icons/LinkVariant-Icon';
import Button from '@atoms/buttons';
import ImageSelector from '@organisms/BlogBuilder/imageSelector';

interface IBlogBuilderInfographics extends Partial<IBlog> {
  image?: string;
}

const BlogBuilderInfographics: React.FC<IBlogBuilderInfographics> = ({ image, setContent }) => {
  const [infographic, setInfographics] = React.useState(false);

  return (
    <section className="grid grid-cols-2 gap-[30px]">
      <div className=" max-w-[380px] overflow-hidden">
        <div
          className="bg-infographics-placeholder min-h-[206px] w-full rounded-lg flex items-center justify-center"
          style={
            image
              ? {
                  backgroundImage: `url(${image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'contain',
                }
              : {}
          }
        >
          {setContent && (
            <button className="bg-link text-caption text-white px-3 py-2 rounded" onClick={() => setInfographics(true)}>
              Select Infographics
            </button>
          )}
        </div>
      </div>
      <div className="p-6 shadow-card bg-white rounded-lg text-center">
        <h4 className="text-h4">Embed our infographics</h4>
        <div className="flex gap-8 px-4 py-[14px] rounded border border-normal-input mt-4">
          <LinkVariantIcon className="w-6 text-bullet" />
          <span className="text-embed text-bullet overflow-hidden">https://talentpoint/embed/qudhqx792</span>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <Button>Copy Code</Button>
        </div>
      </div>
      {infographic && (
        <ImageSelector
          toggleImageSelector={setInfographics}
          contentSet={(file) => {
            if (setContent) {
              setContent((prevValue) => {
                return {
                  ...prevValue,
                  infographic: file,
                };
              });
            }
            setInfographics(false);
          }}
        />
      )}
    </section>
  );
};

export default BlogBuilderInfographics;
