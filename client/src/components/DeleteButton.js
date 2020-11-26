import React, {useState} from 'react';
import {Button, Icon, Confirm} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../utils/graphql';


const DELETE_POST_MUTATION = gql`
 mutation deletePost($postId: String!){
     deletePost(postId: $postId)
 }
`

const DELETE_COMMENT_MUTATION = gql`
 mutation deleteComment($postId: ID!, $commentId: ID! ){
     deleteComment(postId: $postId, commentId: $commentId){
         id
         comments{
             id
             body
             username
         }
         commentCount
     }
 }
`

function DeleteButton({ commentId, postId, callback}){
    const [confirmOpen, setConfirmOpen] = useState(false);
    
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
    const [deletePostOrComment] = useMutation(mutation, {
        // remove post from cache
        update: (proxy, result) => {
            if(!commentId){
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                let posts = data.getPosts.filter((post) => (post.id !== postId));
                proxy.writeQuery({ 
                    query: FETCH_POSTS_QUERY,
                    data: { ...data, getPosts: posts}
                });
            }            
            setConfirmOpen(false);
            if(callback){
                callback();
            }
        },
        variables: { postId, commentId}
    });

    return (
        <React.Fragment>
        <Button floated="right" as="div" color="red" onClick={() => { setConfirmOpen(true)}}>
        <Icon name="trash" style={{ margin: 0}} />
        </Button>
        <Confirm
        open={confirmOpen}
        onCancel={() => { setConfirmOpen(false) }}
        onConfirm={deletePostOrComment}
        />
        </React.Fragment>
    );
}




export default DeleteButton;
