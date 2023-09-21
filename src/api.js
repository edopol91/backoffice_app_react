import axios from 'axios';

export default axios.create({
    baseURL: `https://us-central1-test-b7665.cloudfunctions.net/api/`
});
