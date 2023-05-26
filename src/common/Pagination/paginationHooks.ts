import { useReducer } from 'react';

export enum PAGINATION_CHANGE {
  GOTO = 'GOTO',
  PREV = 'PREV',
  NEXT = 'NEXT',
}

export interface PageProps {
  pageLimit: number;
  pageNo: number;
  totalLength: number;
  handleChange: (page: number) => void;
  totalPageNumber: number;
}

function usePageTransfer(pageProps: PageProps) {
  let totalPageNumber = pageProps.totalPageNumber;

  let [state, dispatch] = useReducer(
    (state: any, action: any) => {
      switch (action.type) {
        case PAGINATION_CHANGE.GOTO:
          return {
            ...state,
            pageNumber: action.payload,
          };
        case PAGINATION_CHANGE.PREV:
          return handlePageChange(state, (action.state = PAGINATION_CHANGE.PREV), totalPageNumber);
        case PAGINATION_CHANGE.NEXT:
          return handlePageChange(state, (action.state = PAGINATION_CHANGE.NEXT), totalPageNumber);
        default:
          return;
      }
    },
    {
      pageNumber: pageProps.pageNo,
      totalPageNumber,
    }
  );

  return { state, dispatch };
}

function handlePageChange(state: any, action: string, totalPageNumber: number) {
  if (action === PAGINATION_CHANGE.PREV && state.pageNumber > 1) {
    return { ...state, pageNumber: state.pageNumber - 1 };
  }

  if (action === PAGINATION_CHANGE.NEXT && state.pageNumber < totalPageNumber) {
    return { ...state, pageNumber: state.pageNumber + 1 };
  }

  return { ...state };
}

export { usePageTransfer };
