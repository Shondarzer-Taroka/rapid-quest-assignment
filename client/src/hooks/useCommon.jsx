import axios from "axios";

 const axiosCommon=axios.create({
   //  baseURL:"https://rapidquestserver.vercel.app/api"
    baseURL:"http://localhost:7700/api"
 })

 
 
 const useCommon = () => {
    return axiosCommon
 };
 
 export default useCommon;