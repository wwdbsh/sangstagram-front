import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
    uri:"https://sangstagram-back.herokuapp.com/",
    clientState:{
        defaults,
        resolvers
    },
    request:(operation) => { // study
        const token = localStorage.getItem("token");
        operation.setContext({
            headers:{
                authorization:`Bearer ${token}`
            }
        });
    }
});