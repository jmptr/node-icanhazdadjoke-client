import ICanHasDadJokeClient from './index';

const client = new ICanHasDadJokeClient('https://icanhazdadjoke.com/');

client
  .getRandomJoke()
  .then((joke) => {
    console.log('joke', joke);
    process.exit(0);
  });
