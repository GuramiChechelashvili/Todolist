
export const deletePost = (id) =>{
    return {
        type:'DELETE_POST',
        id:id
    }
}
export const createPost = (id, title) =>{
    return {
        type:'CREATE_POST',
        title
    }
}

export const createTask = (id) => {
    return {
        type: 'CREATE_TASK',
        id: id
    }
}