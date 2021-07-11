export default interface AsyncSuccessState<T> {
  readonly data: T;
  readonly error?: undefined;
  readonly loading: false;
}
