// @flow
export async function generateRandomNumber(): Promise<number> {
  // simulate an asynchronous operation
  return new Promise((res) => setTimeout(res, 1000))
    .then(() => Math.floor(Math.random() * 100));
}
