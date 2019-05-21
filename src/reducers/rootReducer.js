import uuid from 'uuid';

const initState = {
  posts: [
  ],
  categories: [
  ]
}

const rootReducer = (state = initState, action) => {
  if(action.type ==='DELETE_POST'){
    let newPosts = state.posts.filter(post =>{
      return action.id !== post.id
    });
    return{
      ...state,
      posts:newPosts
    }
  }
  if(action.type ==='CREATE_POST'){

    let newtask = prompt('Enter a task')
    if(newtask===null && newtask === ''){
      return
    }

    const newCategory = {
      id: uuid(),
      title: newtask,
      items: []
    }
    return{
      ...state,
      posts: [...state.posts, newCategory]
    }
    
  }

  if(action.type === 'CREATE_TASK') {
    let newTask = prompt('Enter task');
    let dateObj = new Date();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
    let seconds = dateObj.getSeconds();
    let minutes = dateObj.getMinutes();
    let hour = dateObj.getHours();

    let newDate =
      year +
      "/" +
      month +
      "/" +
      day +
      " " +
      hour +
      ":" +
      minutes +
      ":" + seconds
    const obj = {
      id: uuid(),
      title: newTask,
      completed: false,
      createTime: newDate
    }

    const posts = [...state.posts];
    const post = posts.find(post => post.id === action.id);
    post.items.push(obj);

    const index = posts.findIndex(post => post.id === action.id);
    posts.splice(index, 1, post);

    return {
      ...state,
      posts
    }
  }
  return state;
}

export default rootReducer