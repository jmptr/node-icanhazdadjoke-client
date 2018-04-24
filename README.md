# icanhazdadjoke-client

icanhazdadjoke api node client.

## Installation

`npm install icanhazdadjoke-client`

## Usage

Note that this client is for server-side usage only, as the API has a condition that the User Agent header is modified, which is illegale in web browsers.

```

import ICanHazDadJokeClient from 'icanhazdadjoke-client';

const client = new ICanHazDadJokeClient();
const joke = await client.getRandomJoke();

```
