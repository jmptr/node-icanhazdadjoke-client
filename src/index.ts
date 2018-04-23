import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface DadJoke {
  id: string;
  joke: string;
  status?: string;
}

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

export class ICanHazDadJokeClient {
  public client: AxiosInstance = null;

  constructor(baseURL: string = 'https://icanhazdadjoke.com/') {
    this.client = axios.create({ baseURL});
    // https://icanhazdadjoke.com/api#api-response-format
    // set the Accept header to ensure the response is json
    this.client.defaults.headers.common.Accept = 'application/json';
    // https://icanhazdadjoke.com/api#custom-user-agent
    // set the User-Agent header to identify the consumer
    // tslint:disable-next-line:max-line-length
    this.client.defaults.headers.common['User-Agent'] = 'node-icanhasdadjoke-client (https://github.com/jmptr/node-icanhazdadjoke-client)';
  }

  /**
   * Fetch a random dad joke
   */
  public async getRandomJoke(): Promise<DadJoke> {
    const config: AxiosRequestConfig = {
      url: '/',
      method: 'GET',
    }
    const response = await this.client.request(config);
    return response.data;
  }

  /**
   * Fetch a dad joke
   * @param id key used to look up joke
   */
  public async getJokeById(id: string): Promise<DadJoke> {
    const config: AxiosRequestConfig = {
      url: `/j/${id}`,
      method: 'GET',
    }
    const response = await this.client.request(config);
    return response.data;
  }

  /**
   * Search for dad jokes
   * @param page page number to start result set
   * @param limit number of items in result set
   * @param term term to find within joke text
   */
  public async search(page?: number, limit?: number, term?: string): Promise<DadJokeSearchResponse> {
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

