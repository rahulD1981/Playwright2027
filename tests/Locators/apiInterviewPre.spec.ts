import { expect, test } from '@playwright/test';

test('booking endpoint returns booking details', async ({ request }) => {
  const response = await request.get(
    'https://restful-booker.herokuapp.com/booking/1'
  );

  expect(response.ok()).toBeTruthy();

  const booking = await response.json();
  expect(booking).toEqual(
    expect.objectContaining({
      firstname: expect.any(String),
      lastname: expect.any(String),
      totalprice: expect.any(Number),
      bookingdates: expect.any(Object),
    })
  );
});
