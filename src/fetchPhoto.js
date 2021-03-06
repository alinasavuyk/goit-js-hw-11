const API_KEY ='24517563-cb5ca9bdf2a7ef421e07dbbf9';
const axios = require('axios').default;
 export default class ApiServise {
  constructor(){
    this.searchQuery ='';
    this.page = 1;
   
  }
 
  async fetchPhoto() {
  console.log(this)
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    
  return  axios.get(url).then(response=>{
    this.incrementPage();
    return  response.data})
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
 }