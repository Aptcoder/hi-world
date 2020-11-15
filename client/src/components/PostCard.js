import React from 'react';
import {Card, Icon, Label, Image, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import moment from 'moment';

function likePost(){
  console.log('Liked post');
}

function commentOnPost(){
  console.log('comment on post');
}

const PostCard = (props) => {
    const {username, body, createdAt, likeCount, commentCount, id} = props.post;
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
      <Button as='div' labelPosition='right'>
      <Button color='teal' basic onClick={likePost}>
        <Icon name='heart' />
      </Button>
      <Label  basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
    <Button as='div' labelPosition='right'>
      <Button color='blue' basic onClick={commentOnPost}>
        <Icon name='comments' />
      </Button>
      <Label  basic color='teal' pointing='left'>
        {commentCount}
      </Label>
    </Button>
      </Card.Content>
        </Card>
    );
}

export default PostCard;
