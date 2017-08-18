import axios, { AxiosInstance } from 'axios';

export interface IDadJoke {
  id: string;
  joke: string;
  status?: string;
}

export interface IDadJokeSearchResponse {
  current_page: number;
  limit: number;
  next_page: number;
  previous_page: number;
  results: IDadJoke[];
  search_tearm: string;
  status: number;
  total_jokes: number;
  total_pages: number;
}

class ICanHasDadJokeClient {
  private client: AxiosInstance = null;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL});
    // https://icanhazdadjoke.com/api#api-response-format
    // set the Accept header to ensure the response is json
    this.client.defaults.headers.common.Accept = 'application/json';
    // https://icanhazdadjoke.com/api#custom-user-agent
    // set the User-Agent header to identify the consumer
    // tslint:disable-next-line:max-line-length
    this.client.defaults.headers.common['User-Agent'] = 'node-icanhasdadjoke-client (https://github.com/jmptr/node-icanhazdadjoke-client)';
  }

  public async getRandomJoke(): Promise<IDadJoke> {
    const response = await this.client.get('');
    return response.data;
  }

  public async getJokeById(id: string): Promise<IDadJoke> {
    const response = await this.client.get(`/j/${id}`);
    return response.data;
  }

  public async search(term: string): Promise<IDadJokeSearchResponse> {
    const response = await this.client.get(`/search?${term}`);
    return response.data;
  }

}

export default ICanHasDadJokeClient;
