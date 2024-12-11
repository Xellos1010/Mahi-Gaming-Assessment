import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual(
      expect.objectContaining({
        status: "OK",
        timestamp: expect.any(String), // Expect timestamp to be a string (ISO format)
      })
    );

    // Optionally check if timestamp is a valid date
    const timestamp = new Date(res.data.timestamp);
    expect(timestamp).toBeInstanceOf(Date);
    expect(timestamp.getTime()).toBeGreaterThan(Date.now() - 1000); // Check if within the last second
  });
})
