import { SerializerInterceptor } from './user-serializer.interceptor';

describe('UserSerializerInterceptor', () => {
  it('should be defined', () => {
    expect(new SerializerInterceptor(Date)).toBeDefined();
  });
});
