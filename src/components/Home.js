import React, { Component } from 'react';
import {deletePost} from '../actions/postActions';
import {createPost} from '../actions/postActions';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class Home extends Component {

  addtaskClick=()=>{
    this.props.createPost();
  }
  render(){
    console.log(this.props.categories)
    const { posts } = this.props;
    const postList = posts.length ? (
      posts.map(post => {
        return (
          <div className="post card" key={post.id}>
            <div className="card-content">
              <Link to={'/' + post.id}>
                <span className="card-title red-text">{post.title}</span>
              </Link>
              <p>{post.body}</p>
            </div>
          </div>
        )
      })
    ) : (
      <div className="center">Nothing to show</div>
    );

    return (
      <div>
        <div className="container home">
          <h4 className="center">Home</h4>
          <button className="addcategory" onClick={this.addtaskClick}>Add a Category</button>
          {postList}
        </div>
      </div>
    )
  }
}

const mapStateToProps =(state)=>{
  return {
    posts:state.posts,
    categories:state.categories
  }
}
const mapDispatchToProps =(dispatch)=>{
  return{
    deletePost:(id) =>{dispatch(deletePost(id))},
    createPost:()=>{dispatch(createPost())}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)