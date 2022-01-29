function calcTime (timer) {
  const secTimer = timer / 1000;

  return {
    days: Math.floor(secTimer / 60 / 60 / 24),
    hours: Math.floor(secTimer / 60 / 60) % 24,
    minutes: Math.floor(secTimer / 60) % 60,
    seconds: Math.floor(secTimer) % 60
  };
}

export default calcTime;
