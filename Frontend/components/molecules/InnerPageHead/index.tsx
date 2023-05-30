import React from 'react';

const InnerPageHead: React.FC<{ heading?: string }> = ({ heading }) => {
  return (
    <>
      {heading && (
        <section className="mt-10">
          <h3 className="text-h3 text-neutral-900">{heading}</h3>
        </section>
      )}
    </>
  );
};

export default InnerPageHead;
