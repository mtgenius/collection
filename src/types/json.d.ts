declare module '*.json' {
  const _: { default: Record<number | string, unknown> };
  export = _;
}
