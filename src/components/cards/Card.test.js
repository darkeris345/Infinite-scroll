const { jest } = require('@jest/globals');

describe('handleLike function', () => {
  let setLikedItems;
  let likedItems;
  let id;
  let isLiked;

  beforeEach(() => {
    likedItems = [1, 2, 3];
    id = 4;
    isLiked = false;
    setLikedItems = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function handleLike() {
    setLikedItems((prev) =>
      isLiked ? prev.filter((item) => item !== id) : [...new Set([...prev, id])]
    );
  }

  it('should add id to likedItems when id is not in likedItems', () => {
    setLikedItems.mockImplementation((updateFunction) => {
      likedItems = updateFunction(likedItems);
    });

    handleLike();

    expect(setLikedItems).toHaveBeenCalledTimes(1);
    expect(likedItems).toEqual([1, 2, 3, 4]);
  });


  it('should add id to likedItems when isLiked is false', () => {

    setLikedItems.mockImplementation((updateFunction) => {
      likedItems = updateFunction(likedItems);
    });

    handleLike();

    expect(setLikedItems).toHaveBeenCalledTimes(1);
    expect(likedItems).toEqual([1, 2, 3, 4]);
  });

  it('should add id to likedItems when id is not in likedItems', () => {

    setLikedItems.mockImplementation((updateFunction) => {
      likedItems = updateFunction(likedItems);
    });

    handleLike();

    expect(setLikedItems).toHaveBeenCalledTimes(1);
    expect(likedItems).toEqual([1, 2, 3, 4]);
  });
});