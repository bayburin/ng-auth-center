import { RequestState } from './request-state.model';

describe('RequestState', () => {
  let model: RequestState;
  const value = 'fake-value';

  describe('constructor', () => {
    it('should set received string to value attribute', () => {
      expect(new RequestState(value).value).toEqual(value);
    });
  });

  describe('features', () => {
    beforeEach(() => {
      model = new RequestState();
      model.generateCode();
    });

    describe('#generateCode', () => {
      it('generate string value with CODE_LENGTH length and save in into "value" attribute', () => {
        expect(model.value.length).toEqual((model as any).CODE_LENGTH);
      });
    });

    describe('#isValid', () => {
      it('should return false if received value is not equal "value" attribute', () => {
        expect(model.isValid(value)).toBeFalse();
      });

      it('should return true if received value is equal "value" attribute', () => {
        model.value = value;

        expect(model.isValid(value)).toBeTrue();
      });
    });
  });
});
