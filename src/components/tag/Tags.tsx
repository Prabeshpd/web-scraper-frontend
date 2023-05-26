import * as React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { uploadTags, fetchTags } from '../../actions/tag';

import Pagination from '../../common/Pagination/Pagination';

import { Tag } from '../../types/Tag';
import AppState from '../../types/state/AppState';
import { PageParams, PaginationMeta } from '../../types/Pagination';

import FileUploader from '../../common/FileUploader';

interface StatePropsInterface {
  tags: Tag[];
  isLoadingFetchTags: boolean;
  isLoadingUploadTags: boolean;
  meta: PaginationMeta;
}

interface DispatchPropsInterface {
  uploadTags: (formData: FormData) => void;
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

    fetchTagRecords().catch((err) => console.log(err));
  }, [pageNumber]);

  const onTagOpen = async (id: number) => {
    let path = `/app/results/${id}`;
    navigate(path);
  };

  const onUpload = async (formData: FormData) => {
    await uploadTags(formData);
  };
  return (
    <>
      <div className="container w-100">
        <FileUploader
          fileSizeLimit={60000}
          allowedMimeTypes={['text/csv']}
          isLoading={isLoadingUploadTags}
          onUpload={onUpload}
        />
        <div className="callout m-8">
          <h3>Tags</h3>
          {!isLoadingFetchTags && (
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
          )}
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
