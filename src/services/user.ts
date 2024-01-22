export const usersService = (database: string) => {
  const getUsersSvc = async () => {
    //the actual logic of fetching users,
    //pass all dependencies needed as parameters

    //database
    return [
      {
        id: 1,
        name: 'tester',
      },
      {
        id: 2,
        name: 'tester2',
      },
    ];
  };

  return {
    getUsersSvc,
  };
};
