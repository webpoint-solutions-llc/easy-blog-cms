import React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@atoms/buttons';
import Heading from '@atoms/headers';

import SadFaceIcon from '@atoms/icons/SadFace-Icon';
import BreifCaseIcon from '@atoms/icons/BriefCase-Icon';
import { EHeadingSize } from '@atoms/headers/heading.types';

const EmptyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex my-12">
      <section className="flex flex-col items-center mx-auto p-16 gap-8 bg-white rounded-md">
        <BreifCaseIcon className="w-20 text-error" />
        <article className="flex flex-col gap-2 items-center">
          <Heading size={EHeadingSize.h4} className="text-neutral-900">
            Data Not Found
          </Heading>
          <p className="font-medium text-[#818181] text-lg leading-7">There are no data to show right now.</p>
        </article>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </section>
    </main>
  );
};

export default EmptyPage;
