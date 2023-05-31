import * as React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import { uploadTags, fetchTags } from '../../actions/tag';

import Pagination from '../../common/Pagination/Pagination';

import { Tag } from '../../types/Tag';
import AppState from '../../types/state/AppState';
import { PageParams, PaginationMeta } from '../../types/Pagination';

import { CSV_SCRAPER_FILE_KEYS_LIMIT } from '../../constants/common';

import FileUploader from '../../common/FileUploader';

interface StatePropsInterface {
  tags: Tag[];
  isLoadingFetchTags: boolean;
  isLoadingUploadTags: boolean;
  meta: PaginationMeta;
}

interface DispatchPropsInterface {
  uploadTags: (payload: { tags: string[] }) => void;
  fetchTags: (pageParams: PageParams) => void;
}

type InjectedProps = StatePropsInterface & DispatchPropsInterface;

const TagsPage = (props: InjectedProps) => {
  const { uploadTags, tags, isLoadingUploadTags, isLoadingFetchTags, fetchTags, meta } = props;
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  let navigate = useNavigate();

  React.useEffect(() => {
    async function fetchTagRecords() {
      const queryParams = { maxRows: 10, currentPage: pageNumber };

      await fetchTags(queryParams);
    }

    fetchTagRecords().catch((err) => toast.error('Failed to load the results'));
  }, [pageNumber]);

  const onTagOpen = async (id: number) => {
    let path = `/app/results/${id}`;
    navigate(path);
  };

  const onUpload = async (tags: string[]) => {
    try {
      await uploadTags({ tags });
      toast.success('File Uploaded successfully');
    } catch (err) {
      toast.error('Unable to upload file');
    }
    const queryParams = { maxRows: 10, currentPage: pageNumber };

    await fetchTags(queryParams);
  };
  return (
    <>
      <div className="container w-100">
        <FileUploader
          csvKeyCountLimit={CSV_SCRAPER_FILE_KEYS_LIMIT}
          allowedMimeTypes={['text/csv']}
          isLoading={isLoadingUploadTags}
          onUpload={onUpload}
        />
        <div className="callout m-8">
          <h3>Tags</h3>
          {(!isLoadingFetchTags && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Has SearchResult</th>
                </tr>
              </thead>
              <tbody>
                {(tags.length &&
                  tags.map((tag) => {
                    return (
                      <tr>
                        <td>{tag.name}</td>
                        <td
                          onClick={() => {
                            if (!tag.resultsId) return;
                            onTagOpen(tag.resultsId);
                          }}
                        >
                          {tag.resultsId ? 'Yes' : 'No'}
                        </td>
                      </tr>
                    );
                  })) || <tr>No Data to show yet.</tr>}
              </tbody>
            </table>
          )) || <ClipLoader />}
          <Pagination
            totalPageNumber={Math.ceil(meta.totalCount / meta.perPage)}
            pageLimit={meta.perPage}
            pageNo={meta.currentPage}
            handleChange={(number: number) => {
              setPageNumber(number);
            }}
            totalLength={meta.totalCount}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    tags: state.data.tags.tags,
    meta: state.data.tags.meta,
    isLoadingFetchTags: state.ui.tags.isLoadingFetchTags,
    isLoadingUploadTags: state.ui.tags.isLoadingUploadTags,
  };
};

const mapDispatchToProps = {
  uploadTags,
  fetchTags,
};

export default connect<StatePropsInterface, DispatchPropsInterface>(mapStateToProps, mapDispatchToProps)(TagsPage);
