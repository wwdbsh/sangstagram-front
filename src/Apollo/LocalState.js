export const defaults = {
    isLoggedIn: Boolean(localStorage.getItem("token")) || false
};

export const resolvers = {
    Mutation:{
        logUserIn: (_, {token}, {cache}) => {
            localStorage.setItem("token", token);
            cache.WriteData({
                data:{
                    isLoggedIn:true
                }
            });
            return null;
        },
        logUserOut: (_, __, {cache}) => {
            localStorage.removeItem("token");
            window.location.reload();
            return null;
        }
    }
};