import { TruncateTextPipe } from './truncate-text.pipe';

describe('TruncateTextPipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateTextPipe();
    expect(pipe).toBeTruthy();
  });

  it('should truncate text', () => {
    const pipe = new TruncateTextPipe();
    const value = pipe.transform('test test', 4);
    expect(value).toEqual('test...');
  });

  it('should not truncate text', () => {
    const pipe = new TruncateTextPipe();
    const value = pipe.transform('test test', 10);
    expect(value).toEqual('test test');
  });
});
