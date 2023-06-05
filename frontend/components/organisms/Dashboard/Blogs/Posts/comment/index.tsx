import React from 'react';

import moment from 'moment';
import Inputs from '@atoms/inputs';
import Button from '@atoms/buttons';
import Modal from '@molecules/Modal';
import { CommentBreadCrumb } from './const';
import UserIcon from '@atoms/icons/User-Icon';
import { useNavigate } from 'react-router-dom';
import TrashIcon from '@atoms/icons/Trash-Icon';
import SearchIcon from '@atoms/icons/Search-Icon';
import SliderIcon from '@atoms/icons/Slider-Icon';
import FetchWrapper from '@molecules/FetchWrapper';
import InnerPageHead from '@molecules/InnerPageHead';
import { EButtonType } from '@atoms/buttons/button.types';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';
import TableFooter from '@organisms/Dashboard/TableContent/TableFooter';
import useFetchComments from '@particles/hooks/dashboard/comments/useFetchComments';
import useMutationDeleteComment from '@particles/hooks/dashboard/comments/useMutationDeleteComment';
interface IDeleteModal {
  id: string;
  userName: string;
}
const PostComment = () => {
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = React.useState<
    | boolean
    | {
        id: string;
        userName: string;
      }
  >(false);
  const [search, setSearch] = React.useState('');

  const { data: commentList, isError, isLoading } = useFetchComments();
  const { mutate: deleteComment } = useMutationDeleteComment();

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

  const handleDeleteComment = () => {
    typeof deleteModal === 'object' && deleteComment(deleteModal?.id);
    setDeleteModal(false);
  };

  return (
    <main className="px-10 py-4">
      <BlogsNavigation content={CommentBreadCrumb} />
      <InnerPageHead heading={'All Comments'} />
      <div className="mt-10 bg-white p-6 shadow-card rounded-lg">
        <div className="w-full flex justify-between items-center">
          <h4 className="text-h4v2 text-neutral-800">Total {commentList?.totalData} comments</h4>
          <div className="flex gap-4">
            <Inputs
              className="w-[432px]"
              Icon={SearchIcon}
              onChange={(e) => setSearch(e.target.value)}
              IconClass="text-neutral-500 w-[18px] h-[18px]"
              placeholder="Type keyword to search"
            />
            <Button btnType={EButtonType.outline} className="p-[11px]">
              <SliderIcon />
            </Button>
          </div>
        </div>

        <FetchWrapper isError={isError} isLoading={isLoading} totalData={commentList?.totalData}>
          <div className="mt-8 grid grid-cols-2 gap-6">
            {commentList?.data.map((row, index: number) => (
              <div className="w-full p-6 flex gap-4 bg-neutral-100 rounded-lg relative" key={index}>
                <div className="rounded-full flex items-center justify-center max-w-[56px] min-w-[56px] max-h-[56px] min-h-[56px] bg-neutral-300">
                  <UserIcon className="w-7 h-7 text-neutral-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-4 items-center">
                    <p className="text-body1 text-neutral-900">{row.name}</p>
                    <p className="text-caption text-neutral-600">{moment(row.createdAt).format('LL')}</p>
                  </div>
                  <p className="text-body2 text-neutral-800">{row.message}</p>
                </div>
                <div className="absolute top-[18px] right-[18px]">
                  <div className="cursor-pointer" onClick={() => setDeleteModal({ id: row._id, userName: row.name })}>
                    <TrashIcon className="w-5 h-5 text-error" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <TableFooter totalPage={commentList?.totalPage} />
          </div>
        </FetchWrapper>
      </div>

      {deleteModal && (
        <Modal toggleModal={setDeleteModal}>
          <div className="w-[640px] relative px-6 py-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-h4 text-neutral-900">Delete this comment?</h4>
              <p className="text-body2 text-neutral-600">
                Are you sure you want to delete the comment from user{' '}
                <strong>{typeof deleteModal === 'object' && deleteModal.userName}</strong>?
              </p>
            </div>
            <div className="mt-6 border-b border-b-dash-color"></div>
            <div className="mt-6 flex justify-end gap-4">
              <Button btnType={EButtonType.outline} onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
              <Button
                btnType={EButtonType.none}
                onClick={() => handleDeleteComment()}
                className="bg-error w-[140px] py-3 text-white"
              >
                Delete
              </Button>
            </div>
            <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setDeleteModal(false)}>
              <StaticPlusIcon className="w-6 h-6 rotate-45 text-neutral-700" />
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
};

export default PostComment;
