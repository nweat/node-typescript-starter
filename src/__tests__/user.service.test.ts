import { Context, MockContext, createMockContext } from '../context';
import { usersService } from '../services/user';

/**
 * Reference: https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing
 */

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test('should create new user ', async () => {
  const user = {
    id: 1,
    name: 'Rich',
    gender: 'F',
  };
  mockCtx.prisma.user.create.mockResolvedValue(user);

  await expect(usersService(ctx.prisma).createUser(user)).resolves.toEqual(1);
});

test('should get an existing user ', async () => {
  const user = {
    id: 2,
    name: 'Rich',
    gender: 'F',
  };
  mockCtx.prisma.user.findUnique.mockResolvedValue(user);

  await expect(usersService(ctx.prisma).getUser(2)).resolves.toEqual({ id: 2, name: 'Rich', gender: 'F' });
});

// describe('v1 APIs', () => {
//   it('GET /v1/user/1 - should respond with 200', async () => {
//     const result = await request(app).get('/v1/user/1').set('Accept', 'application/json');
//     expect(result.statusCode).toEqual(200);
//   });
// });
