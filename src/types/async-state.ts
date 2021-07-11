import type AsyncErrorState from '../types/async-error-state';
import type AsyncLoadingState from '../types/async-loading-state';
import type AsyncSuccessState from '../types/async-success-state';

type AsyncState<T> = AsyncErrorState | AsyncLoadingState | AsyncSuccessState<T>;

export default AsyncState;
