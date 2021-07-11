export default interface AsyncSuccessState<T> {
  data: T;
  error?: undefined;
  loading: false;
}
