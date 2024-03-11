export const builderPendingFetchTasks = (state) => {
    state.isLoading = true;
}

export const builderFullfilledFetchTasks = (state,action) => {
    state.isLoading = false;
    state.data = action.payload;
    state.dataC = action.payload;
    state.isError = null;
}

export const builderRejectedFetchTasks = (state) => {
    state.isLoading = false;
    state.isError = true;
}




//One Task
export const builderPendingFetchOneTask = (state) => {
    state.isLoading = true;
}

export const builderFullfilledFetchOneTask = (state,action) => {
    state.isLoading = false;
    state.currentTodoPage = action.payload;
    state.isError = null;
}

export const builderRejectedFetchOneTask = (state) => {
    state.isLoading = false;
    state.isError = true;
}