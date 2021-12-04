import axios from 'axios';
import supabaseClient from "../utils/supabaseClient";

const StoreService ={
    getComponents:async function (setItems) {
        try {
            let { data, error, status } = await supabaseClient.from("Components").select(`*`);
    
            if (error && status !== 406) {
            throw error;
            }
            if (data) {
                setItems(data)
            }
        } catch (error) {
            alert(error.message);
        }
    },
    buyComponents:async function (cart) {
        axios.post('http://backend.neecist.xyz/buy', {
            itemList: cart,
            token:supabaseClient.auth.currentSession.access_token
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getTeamMoney: async function (setMoney) {
        try {
          let { data, error, status } = await supabaseClient.from("Teams").select(`*`);
    
          if (error && status !== 406) {
            throw error;
          }
          if (data) {
            console.log(data)
            setMoney(data[0].CASH);
          }
        } catch (error) {
          alert(error.message);
        }
      },
}

export default StoreService