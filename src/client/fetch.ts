import axios from 'axios';
type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH';

export default class Fetch {
  private baseUrl: string = '';
  fetch(type: Method, url: string, data?: any) {
    this.baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : 'http://120.79.251.33/api';
    return axios({
      method: type,
      url: this.baseUrl + url,
      data: data,
      headers: { "Content-Type": "application/json;charset=utf-8" }
    })
  }
}