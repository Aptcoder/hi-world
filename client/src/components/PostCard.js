import React, { useContext } from 'react';
import {Card, Icon, Label, Image, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from "../context/auth";
import LikeButton from './LikeButton';

function likePost(){
  console.log('Liked post');
}

function commentOnPost(){
  console.log('comment on post');
}

const PostCard = (props) => {

    const { user } = useContext(AuthContext);
    const {username, body, createdAt, likeCount, commentCount, id, likes} = props.post;
    return (
        <Card fluid>
        <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(Number(createdAt)).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <LikeButton user={user} post={ { id, likeCount, likes}}/>
    <Button as='div' labelPosition='right'>
      <Button color='blue' basic as={Link} to={`/posts/${id}`}>
        <Icon name='comments' />
      </Button>
      <Label  basic color='teal' pointing='left'>
        {commentCount}
      </Label>
    </Button>
    { user && user.username === username && (
      <Button floated="right" as="div" color="red" onClick={() => {console.log('delete post')}}>
      <Icon name="trash" style={{ margin: 0}} />
      </Button>
    )}
      </Card.Content>
        </Card>
    );
}

export default PostCard;
