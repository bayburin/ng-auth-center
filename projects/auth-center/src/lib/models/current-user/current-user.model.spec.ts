import { CurrentUser } from './current-user.model';

describe('CurrentUser', () => {
  const userI = { tn: 12123, dept: 714, fio: 'Форточкина Клавдия Ивановна' };
  let model: CurrentUser;

  beforeEach(() => {
    model = new CurrentUser(userI);
  });

  it('should accept values', () => {
    expect(model.tn).toEqual(userI.tn);
    expect(model.fio).toEqual(userI.fio);
    expect(model.dept).toEqual(userI.dept);
  });
});
