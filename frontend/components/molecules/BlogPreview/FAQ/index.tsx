import React from 'react';

import { useMediaQuery } from 'react-responsive';

import FAQCard from '@molecules/FAQCard';
import { parseHTML } from '@particles/helper/blogFAQFormatter';

import FAQCss from '@particles/css/blogPreview/faq.module.css';

const BlogPreviewFAQ: React.FC<{ data: string }> = ({ data }) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const value = parseHTML(data);

  const currentSectionRef = React.useRef<HTMLDivElement>(null);
  const firstQuestionRef = React.useRef<HTMLDivElement>(null);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  React.useEffect(() => {
    if (isDesktopOrLaptop) {
      if (activeIndex !== null) currentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (activeIndex !== null) firstQuestionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeIndex, isDesktopOrLaptop]);

  return (
    <section className="mt-14" ref={currentSectionRef}>
      <h2 className="text-smh2 lg:text-h2 text-neutral-900">FAQs</h2>
      <article className="mt-8 list-outside" ref={firstQuestionRef}>
        {value.map((faqContent, index) => (
          <FAQCard
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            header={faqContent.question}
            index={index}
            maxData={value.length}
            key={`FAQ-${index}`}
          >
            <div dangerouslySetInnerHTML={{ __html: faqContent.answer }} className={FAQCss.answer} />
          </FAQCard>
        ))}
      </article>
    </section>
  );
};

export default BlogPreviewFAQ;
