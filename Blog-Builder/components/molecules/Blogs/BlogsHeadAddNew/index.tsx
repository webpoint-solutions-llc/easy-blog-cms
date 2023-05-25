import React from 'react';

import Button from '@atoms/buttons';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';
import Inputs from '@atoms/inputs';
import SearchIcon from '@atoms/icons/Search-Icon';
import { useNavigate } from 'react-router-dom';

type blogsOnClick = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => null | void;

interface IBlogsHeadAddNew {
  heading: string;
  onClick: blogsOnClick;
  buttonPlaceholder?: string;
  searchBar?: boolean;
  searchBarPlaceholder?: string;
}

const BlogsHeadAddNew: React.FC<IBlogsHeadAddNew> = ({
  heading,
  onClick,
  buttonPlaceholder = 'Create New',
  searchBar,
  searchBarPlaceholder = 'Type keyword to search',
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const searchStatus = new URLSearchParams(location.search);

    searchStatus.set('search', search);

    navigate(
      {
        pathname: '.',
        search: searchStatus.toString(),
      },
      {
        replace: true,
      },
    );
  }, [search]);

  return (
    <section className="w-full flex justify-between items-center">
      <h3 className="text-h3 text-neutral-900">{heading}</h3>
      <div className="flex flex-col lg:flex-row gap-4">
        {searchBar && (
          <Inputs
            className="max-h-[42px]  w-full lg:w-[432px] placeholder:text-caption placeholder:text-neutral-500 text-neutral-900"
            Icon={SearchIcon}
            IconClass="text-neutral-500 w-[18px] h-[18px]"
            placeholder={searchBarPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
        <Button onClick={onClick}>
          <span className="text-caption text-neutral-900 flex items-center gap-2">
            <StaticPlusIcon />
            {buttonPlaceholder}
          </span>
        </Button>
      </div>
    </section>
  );
};

export default BlogsHeadAddNew;
