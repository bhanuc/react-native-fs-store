import Store from '../Store';
const Storage = new Store('default', false);

describe('Testing Store functionality', () => {
  it('get an item that is set.', async () => {
    const testObj = {"test": "value"};
    await Storage.setItem('testItem', testObj);
    const objReturned = await Storage.getItem('testItem');
    expect(objReturned).toEqual(testObj);
  });
});
