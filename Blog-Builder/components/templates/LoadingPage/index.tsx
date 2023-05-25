import React from 'react';

import Heading from '@atoms/headers';
import LoadingIcon from '@atoms/buttons/LoadingIcon';
import { EHeadingSize } from '@atoms/headers/heading.types';

const LoadingPage: React.FC = () => {
  return (
    <main className="w-full h-full py-16 flex justify-center items-center">
      <section className="flex flex-col gap-6 items-center">
        <LoadingIcon btnType="o" width="40" height="40" />
        <article className="flex flex-col gap-2 items-center">
          <Heading size={EHeadingSize.h4}>Loading...</Heading>
          <p className="font-medium text-lg leading-6 text-gray">It will take just a few seconds.</p>
        </article>
      </section>
    </main>
  );
};

export default LoadingPage;
