import * as React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import AppState from '../../types/state/AppState';
import { SearchResult } from '../../types/Search';
import { fetchResult } from '../../actions/search';

interface StatePropsInterface {
  result: SearchResult;
  isLoadingSearchResult: boolean;
}

interface DispatchPropsInterface {
  fetchResult: (id: number) => void;
}

type InjectedProps = StatePropsInterface & DispatchPropsInterface;

const ResultDetail = (props: InjectedProps) => {
  const { result, isLoadingSearchResult, fetchResult } = props;
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchRecord() {
      if (!id) return;
      await fetchResult(+id);
    }

    fetchRecord().catch((err) => {
      toast.error('Failed to load the search result');
      console.log(err);
    });
  }, []);

  if (isLoadingSearchResult) return <ClipLoader />;
  return (
    <div className="container w-100">
      <div className="callout m-8">
        <div className="card-divider">
          <h4>Search Detail</h4>
        </div>
        <div className="card-section">
          <p>TotalAdsCount: {result.adWordsCount}</p>
          <p>StatsResult: {result.totalResults}</p>
          <p>TotalLinksCount: {result.linksCount}</p>
          <div>
            <span>Html Content</span>
            {result.htmlPage}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    result: state.data.searchResults.searchResult,
    isLoadingSearchResult: state.ui.searchResults.isLoadingFetchResult,
  };
};

const mapDispatchToProps = {
  fetchResult,
};

export default connect<StatePropsInterface, DispatchPropsInterface>(mapStateToProps, mapDispatchToProps)(ResultDetail);
