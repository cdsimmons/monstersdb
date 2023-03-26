export const mockSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { username: "admin" }
};

export const useSession = jest.fn(() => {
  return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
});