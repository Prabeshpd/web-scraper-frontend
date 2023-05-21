import UIState from './ui/UI';
import DataState from './data/Data';

interface AppState {
  readonly ui: UIState;
  readonly data: DataState;
}

export default AppState;
