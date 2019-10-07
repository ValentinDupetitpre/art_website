const prod = {
    url: {
     API_URL: 'https://sheltered-dusk-71937.herokuapp.com',
   }
}
const dev = {
    url: {
     API_URL: 'http://localhost:5000'
    }
};

const configURL = process.env.NODE_ENV === 'development' ? dev.url.API_URL : prod.url.API_URL
export default 'https://sheltered-dusk-71937.herokuapp.com'