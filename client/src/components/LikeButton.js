import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const LikeButton = ({user, post : { id, likes, likeCount, username}}) => {
    const [liked, setLiked] = useState(null);
    useEffect(() => {
        if( user && likes.find((like) => (like.username == user.username)))
        {
            setLiked(true);
        }
        else { setLiked(false)}
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: id}
    })

    const likeButton = ( 
        user ? 
        liked ? 
        (<Button color='teal' onClick={likePost}>
        <Icon name='heart' />
      </Button>) : 
      ( <Button color='teal' basic onClick={likePost}>
      <Icon name='heart' />
    </Button>)
         : 
         (<Button as={Link} to="/login" color='teal' basic>
         <Icon name='heart' />
       </Button>)
    )

    return (
        <Button as="div" labelPosition='right'>
         {likeButton}
         <Label  basic color='teal' pointing='left'>
           {likeCount}
         </Label>
       </Button>
    )

}

const LIKE_POST = gql`
    mutation LikePost( $postId: ID! ){
            likePost( postId: $postId){
                id body createdAt
            likes {
                username
            }
            comments {
                id
                username
                body
            }
            likeCount
            commentCount

            }
    }
`


export default LikeButton;
