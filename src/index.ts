import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';

/**
 * A dad joke entity is a wrapper for the dad joke content.
 */
export interface DadJoke {
  /**
   * Unique id for this content.
   */
  id: string;
  /**
   * String content or body to be displayed to the user. This is the joke.
   */
  joke: string;
  /**
   * HTTP status of the response.
   *
   * This may be present when the [[DadJoke]] is a top-level entity in the response.
   */
  status?: number;
}

/**
 * Wrapper for dad joke list.
 */
export interface DadJokeSearchResponse {
  current_page: number;
  limit: number;
  next_page: number;
  previous_page: number;
  results: DadJoke[];
  search_tearm: string;
  status: number;
  total_jokes: number;
  total_pages: number;
}

/**
 * HTTP client for the [icanhazdadjoke api](https://icanhazdadjoke.com/api)
 */
export default class ICanHazDadJokeClient {
  /**
   * Client used to make http requests.  This is public to facilitate testing.
   */
  public client: AxiosInstance;

  /**
   * Constructor sets up the internal http client defaults, including the ones
   * specified in [Custom user agent](https://icanhazdadjoke.com/api#custom-user-agent).
   *
   * @param baseURL base url to the api
   */
  constructor(baseURL = 'https://icanhazdadjoke.com/') {
    this.client = axios.create({ baseURL });
    // https://icanhazdadjoke.com/api#api-response-format
    // set the Accept header to ensure the response is json
    this.client.defaults.headers.common.Accept = 'application/json';
    // https://icanhazdadjoke.com/api#custom-user-agent
    // set the User-Agent header to identify the consumer
    // tslint:disable-next-line:max-line-length
    this.client.defaults.headers.common['User-Agent'] = 'node-icanhasdadjoke-client (https://github.com/jmptr/node-icanhazdadjoke-client)';
  }

  /**
   * Fetch a random dad joke.
   *
   * See: (Fetch a random dad joke)[https://icanhazdadjoke.com/api#fetch-a-random-dad-joke]
   */
  public async getRandomJoke() {
    const config: AxiosRequestConfig = {
      url: '/',
      method: 'GET',
    }
    const response = await this.client.request<DadJoke>(config);
    return response.data;
  }

  /**
   * Fetch a dad joke
   *
   * See: (Fetch a dad joke)[https://icanhazdadjoke.com/api#fetch-a-dad-joke]
   * @param id key used to look up joke
   */
  public async getJokeById(id: string) {
    const config: AxiosRequestConfig = {
      url: `/j/${id}`,
      method: 'GET',
    }
    const response = await this.client.request<DadJoke>(config);
    return response.data;
  }

  /**
   * Search for dad jokes
   *
   * See: (Search for dad jokes)[https://icanhazdadjoke.com/api#search-for-dad-jokes]
   * @param page which page of results to fetch (default: 1)
   * @param limit number of results to return per page (default: 20) (max: 30)
   * @param term search term to use (default: list all jokes)
   */
  public async search(
    page?: number,
    limit?: number,
    term?: string
  ) {
    const config: AxiosRequestConfig = {
      url: '/search',
      params: {
        term,
        page,
        limit,
      },
      method: 'GET',
    };

    const response = await this.client.request<DadJokeSearchResponse>(config);
    return response.data;
  }

}
