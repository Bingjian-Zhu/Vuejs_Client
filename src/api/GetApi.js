import axios from 'axios'
import Mgr from "../api/oidc-config";

const baseUrl = 'http://localhost:5001/';
var mgr = new Mgr();
export default class ApiService {

  async defineHeaderAxios () {
    await mgr.getAcessToken().then(
      acessToken => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + acessToken
      }, err => {
        console.log(err)
      })  
  }

  async getAll(api){
    await this.defineHeaderAxios() 
    return axios
      .get(baseUrl + api)
      .then(response => response.data)
      .catch(err => {
        console.log(err);
      })
  }

  async revokeToken(clientId){
    window.location.href="http://localhost:5000/grants";
    // await this.defineHeaderAxios() 
    // return axios
    //   .get(baseUrl + 'identity/RevokeToken?_clientId=' + clientId)
    //   .then(response => response.data)
    //   .catch(err => {
    //     console.log(err);
    //   })
  }
}

