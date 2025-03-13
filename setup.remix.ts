import '@kurocado-studio/qa/remix/setup';

vi.mock('redis', async () => {
  const actualRedis = await vi.importActual('redis');

  return {
    ...actualRedis,
    createClient: vi.fn(() => {
      return {
        connect: vi.fn().mockResolvedValue(undefined),
        set: vi.fn().mockResolvedValue('OK'),
        get: vi.fn().mockResolvedValue(null),
      };
    }),
    Cluster: actualRedis['Cluster'],
  };
});
