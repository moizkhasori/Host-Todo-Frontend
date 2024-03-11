export const builderPendingFetchUserDetails = (state) => {
    state.isLoading = true;
}

export const builderFullfilledFetchUserDetails = (state,action) => {
    state.isLoading = false;
    state.isLoggedin = true;
    state.data = action.payload;
    state.isError = null;
}

export const builderRejectedFetchUserDetails = (state) => {
    state.isLoading = false;
    state.isError = true;
}