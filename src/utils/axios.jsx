import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODlhMjU1N2I3Nzg1ZDIxNGZkZDU4MWU3Zjg2YjVjYiIsIm5iZiI6MTc3NjE0OTQ4OC41NTcsInN1YiI6IjY5ZGRlM2YwYWVkMDk5MDhkMGM3NDViMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XoOUeuxG-MZuWBiWRyZXbr0WwIouKsFdWkSlEl2T58Q'
    }
})

export default instance