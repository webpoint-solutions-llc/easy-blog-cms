import React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '@atoms/buttons';
import Heading from '@atoms/headers';
import BreifCaseIcon from '@atoms/icons/BreifCase-Icon';
import { EHeadingSize } from '@atoms/headers/heading.types';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="flex my-12">
      <section className="flex flex-col items-center mx-auto p-16 gap-8 bg-white rounded-md">
        <BreifCaseIcon className="w-20 text-error" />
        <article className="flex flex-col gap-2 items-center">
          <Heading size={EHeadingSize.h4} className="text-neutral-900">
            Page Not Found
          </Heading>
          <p className="font-medium text-[#818181] text-lg leading-7">
            Oops! Seems like the page you requested doesn’t exist.
          </p>
        </article>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </section>
    </main>
  );
};

export default NotFoundPage;
