import * as React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchSearchResults } from '../../actions/search';

import Pagination from '../../common/Pagination/Pagination';

import AppState from '../../types/state/AppState';
import { SearchResult } from '../../types/Search';
import { PageParams, PaginationMeta } from '../../types/Pagination';

interface StatePropsInterface {
  searchResults: SearchResult[];
  isLoadingFetchSearchResults: boolean;
  meta: PaginationMeta;
}

interface DispatchPropsInterface {
  fetchSearchResults: (queryParams: PageParams) => void;
}

type InjectedProps = StatePropsInterface & DispatchPropsInterface;

const SearchPage = (props: InjectedProps) => {
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const { fetchSearchResults, meta, isLoadingFetchSearchResults, searchResults } = props;
  let navigate = useNavigate();

  React.useEffect(() => {
    async function fetchSearchResultCount() {
      const queryParams = { maxRows: 10, currentPage: pageNumber };
      await fetchSearchResults(queryParams);
    }
    fetchSearchResultCount().catch((err) => console.log(err));
  }, [pageNumber]);

  const onRowClick = (id: number) => {
    let path = `/app/results/${id}`;
    navigate(path);
  };

  return (
    <div className="container w-100">
      <div className="callout m-8">
        <h3>Search Results</h3>
        {!isLoadingFetchSearchResults && (
          <table>
            <thead>
              <tr>
                <th>Total Ads Count</th>
                <th>Total Links Count</th>
                <th>Stat Result</th>
              </tr>
            </thead>
            <tbody>
              {(searchResults.length &&
                searchResults.map((result) => {
                  return (
                    <tr
                      onClick={() => {
                        onRowClick(result.id);
                      }}
                    >
                      <td>{result.adWordsCount}</td>
                      <td>{result.linksCount}</td>
                      <td>{result.totalResults}</td>
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
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    searchResults: state.data.searchResults.searchResults,
    meta: state.data.searchResults.meta,
    isLoadingFetchSearchResults: state.ui.searchResults.isLoadingFetchSearchResults,
  };
};

const mapDispatchToProps = {
  fetchSearchResults,
};

export default connect<StatePropsInterface, DispatchPropsInterface>(mapStateToProps, mapDispatchToProps)(SearchPage);
