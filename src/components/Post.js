import React, { Component } from 'react';
import {connect} from 'react-redux';
import {deletePost,createPost, createTask} from '../actions/postActions';



class Post extends Component {
  componentDidMount() {
    this.setState({sub_posts:this.props.post.items})
  }
  state = {
    sub_posts:[],
    i: 0
  }
  handleClick=()=>{
    this.props.deletePost(this.props.post.id);
    this.props.history.push('/');
  }
  deleteSubPost(id) { 
    const filteredSubPosts = this.props.post.items.filter(item => item.id !== id);
    this.props.post.items = filteredSubPosts;
    this.setState({sub_posts:filteredSubPosts})
  }
  addtaskClick= async()=>{
    await this.props.createTask(this.props.match.params.post_id);
    console.log('this is it', this.state.sub_posts)
    let sub_posts = [...this.props.post.items];
    this.setState({sub_posts:sub_posts})
  }

  changeCompleted = (id) => {
    let x =2
    x++
    console.log('our target',  id)
    let ourTarget = this.state.sub_posts.find(sub_post => {
      return sub_post.id == id
    })
    console.log('TrueOurTarget', ourTarget)
    if (ourTarget.completed) {
      ourTarget.completed = false
    } else {
      ourTarget.completed = true
    }
    this.setState({i : x})
    console.log(this.state.i)
  }

  render() {
    const post = this.props.post.items ? (
      <div className="post">
        <h4 className="center">{this.props.post.title}</h4>
        <p>{this.props.post.body}</p>
        <div className="center">
          <button className="btn grey" onClick={this.handleClick}>
              Delete Category
          </button>
          <button className="btn grey" onClick={this.addtaskClick}>
              Add Task
          </button>
        </div>
      </div>
    ) : (
      <div className="center">Loading Task...</div>
    );

    return (
      <div className="container">
        {post}
        <ul>
          {
            this.state.sub_posts.map(post => {
              return (<li className="tasklist" key={post.id}>
                <button className={'completedTask'}  onClick={() => this.changeCompleted(post.id)}>Complete</button>
                <div 
                className={post.completed ? 'withLineThrough' : 'withoutLineThrough'}
                >
                {post.title}</div>
                <span>{post.createTime}</span>
                <button className="subtask" onClick={() => this.deleteSubPost(post.id)}>Delete Task</button>
              </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps =(state, ownProps)=>{
  let id =ownProps.match.params.post_id;
  return{
    post:state.posts.find( post => post.id===id)
  }
}

const mapDispatchToProps =(dispatch)=>{
    return{
      deletePost:(id) =>{dispatch(deletePost(id))},
      createPost:()=>{dispatch(createPost())},
      createTask: (id) => dispatch(createTask(id)),
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Post)
