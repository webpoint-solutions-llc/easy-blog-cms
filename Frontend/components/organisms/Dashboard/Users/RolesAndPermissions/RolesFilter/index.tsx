import React from 'react';

import Inputs from '@atoms/inputs';
import Button from '@atoms/buttons';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@atoms/icons/Search-Icon';
import SliderIcon from '@atoms/icons/Slider-Icon';
import DownloadIcon from '@atoms/icons/Download-Icon';
import ReactSelect from '@atoms/react-select/ReactSelect';
import useGetParams from '@particles/hooks/usetGetParams';
import { rolesPermission } from '@particles/const/filter/rolesFilter';
import { EBIconPlacing, EButtonType } from '@atoms/buttons/button.types';
import UsersControllerFilterModal from '@molecules/UsersController/FilterModal';

type onClickHandle = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => null | void;

interface IRolesFilter {
  onExportCSVClick: onClickHandle;
}

const RolesFilter: React.FC<IRolesFilter> = ({ onExportCSVClick }) => {
  const navigator = useNavigate();
  const [rolesSelect, setRolesSelect] = React.useState('');
  const [filterModal, setFilterModal] = React.useState(false);

  const content = useGetParams('content') || '';

  React.useEffect(() => {
    if (content) setRolesSelect(content);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newSearchParams = new URLSearchParams(location.search);

    // set the new value for the 'pageNo' parameter
    newSearchParams.set('search', e.target.value);
    newSearchParams.set('pageNo', '1');

    let path = location.pathname;
    if (path[path.length - 1] !== '/') {
      path = path + '/';
    }

    navigator({
      pathname: path,
      search: newSearchParams.toString(),
    });
  };

  return (
    <section className="w-full p-6 flex justify-between">
      <div className="flex items-center gap-4">
        <span className="text-bodysmall text-neutral-700">Role:</span>
        <ReactSelect
          options={rolesPermission}
          value={rolesSelect}
          onValueChange={(value) => {
            const newSearchParams = new URLSearchParams(location.search);
            // set the new value for the 'pageNo' parameter
            newSearchParams.set('content', value as string);
            newSearchParams.set('pageNo', '1');

            setRolesSelect(value as string);
            navigator({
              pathname: '.',
              search: newSearchParams.toString(),
            });
          }}
          containerClassName="w-[140px]"
          downArrow={true}
        />
      </div>
      <div className="flex gap-4 items-center">
        <Inputs
          className="max-h-[42px] md:w-[300px] xl:w-[432px] placeholder:text-caption placeholder:text-neutral-500 text-neutral-900"
          Icon={SearchIcon}
          onChange={handleSearch}
          value={useGetParams('search') || ''}
          IconClass="w-[18px] h-[18px] text-neutral-500"
          placeholder={'Type keyword to search'}
        />
        <Button
          btnType={EButtonType.outline}
          Icon={DownloadIcon}
          iconPlace={EBIconPlacing.left}
          className="flex gap-2 h-[42px] px-3"
          onClick={onExportCSVClick}
        >
          Export CSV
        </Button>
        <Button
          btnType={EButtonType.outline}
          Icon={SliderIcon}
          iconPlace={EBIconPlacing.left}
          className="flex gap-2 h-[42px] px-3"
          onClick={() => setFilterModal(true)}
        />
      </div>
      {filterModal && <UsersControllerFilterModal toggleModal={setFilterModal} />}
    </section>
  );
};

export default RolesFilter;
