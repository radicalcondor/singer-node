export * from './spec/Config';
export * from './spec/messages/Record';
export * from './spec/messages/Schema';
export * from './spec/messages/State';

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
