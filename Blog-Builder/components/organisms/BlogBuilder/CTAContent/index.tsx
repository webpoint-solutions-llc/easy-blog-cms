import Button from '@atoms/buttons';
import PencilIcon from '@atoms/icons/Pencil-Icon';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';
import Inputs from '@atoms/inputs';
import InputSection from '@molecules/inputSection';
import { IBlog } from '@particles/interface/blogEditContent.interface';
import React from 'react';
import ImageSelector from '../imageSelector';

const BlogBuilderCTAContent: React.FC<IBlog> = ({ content, setContent }) => {
  const [employeeCTA, setEmployeeCTA] = React.useState(false);
  const [employerCTA, setEmployerCTA] = React.useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div
        className="w-full h-[168px] border border-dashed border-link bg-content-bg rounded-lg flex flex-col justify-center items-center relative cursor-pointer"
        onClick={() => {
          setEmployerCTA(true);
        }}
        style={
          content.cta?.employer?.image?.file?.completedUrl
            ? {
                backgroundImage: `url(${content.cta.employer.image.file.completedUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
              }
            : {}
        }
      >
        <StaticPlusIcon className="w-8 text-link" />
        <span className="mt-3 text-button text-link">Add Employer CTA</span>

        <div className="absolute right-4 top-4 bg-pencil-bg p-[10px] rounded">
          <PencilIcon />
        </div>
      </div>
      <div
        className="w-full h-[168px] border border-dashed border-link bg-content-bg rounded-lg flex flex-col justify-center items-center relative cursor-pointer"
        onClick={() => {
          setEmployeeCTA(true);
        }}
        style={
          content.cta?.employee?.image?.file?.completedUrl
            ? {
                backgroundImage: `url(${content.cta.employee.image.file.completedUrl})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
              }
            : {}
        }
      >
        <StaticPlusIcon className="w-8 text-link" />
        <span className="mt-3 text-button text-link">Add Employee CTA</span>
        <div className="absolute right-4 top-4 bg-pencil-bg p-[10px] rounded">
          <PencilIcon />
        </div>
      </div>
      <div className="w-full bg-white rounded-lg shadow-newsLetter p-6 flex flex-col text-center relative">
        <h4 className="text-h4 text-neutral-900">Stay updated</h4>
        <p className="text-body3 text-neutral-700 mt-1">Submit your email to join our newsletter</p>
        <InputSection placeholder="Your email" containerClass="mt-[24px]" />
        <div className="w-full mt-6 flex justify-center">
          <Button>Subscribe</Button>
        </div>
      </div>
      {employeeCTA && (
        <ImageSelector
          toggleImageSelector={setEmployeeCTA}
          contentSet={(file) => {
            setContent((prevValue) => {
              return {
                ...prevValue,
                cta: {
                  ...prevValue.cta,
                  employer: undefined,
                  employee: {
                    ...prevValue.cta.employee,
                    image: file,
                  },
                },
              };
            });
            setEmployeeCTA(false);
          }}
        />
      )}
      {employerCTA && (
        <ImageSelector
          toggleImageSelector={setEmployerCTA}
          contentSet={(file) => {
            setContent((prevValue) => {
              return {
                ...prevValue,
                cta: {
                  ...prevValue.cta,
                  employee: undefined,
                  employer: {
                    ...prevValue.cta.employer,
                    image: file,
                  },
                },
              };
            });
            setEmployerCTA(false);
          }}
        />
      )}
    </div>
  );
};

export default BlogBuilderCTAContent;
