import gql  from 'graphql-tag';
import React, {useContext, useState} from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { Grid, Image, Card, Button, Label, Icon, Form, Popup } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($postId: String!, $body: String!){
        createComment(postId: $postId, body: $body){
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

function SinglePost(props){

    const [comment, setComment] = useState('');
    const {user} = useContext(AuthContext);
    const postId = props.match.params.postId;
    const { data } = useQuery(FETCH_POST, {
        variables: { postId: postId },
    })

    const deletePostCallback = function(){
        props.history.push('/');
    }

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update: (_, result) => {
            console.log(result);
            setComment('');
        },
        variables: { postId, body: comment}
    })

    let postMarkup = <p></p>;
    if(!data || !data.getPost){
        postMarkup = (<p>Loading...</p>)
    } else {
        const { id, comments, likes, commentCount, likeCount, username, body, createdAt} = data.getPost
        postMarkup = (
            <Grid>
            <Grid.Row>
            <Grid.Column width={2}>
                <Image
                src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                size="small"
                float="right"
                /> 
            </Grid.Column>
            <Grid.Column width={10}>
                <Card fluid>
                <Card.Content>
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                    <Card.Description>
                    {body}
                    </Card.Description>
                </Card.Content>
                <hr/>
                <Card.Content extra>
                    <LikeButton user={user} post={{ id, likes, likeCount, username}} />
                    <Popup content="comment" trigger={
                    <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log('comment')}
                    >
                    <Button basic color="blue">
                    <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left"> 
                    {commentCount}
                    </Label>
                    </Button>
                    }/>
                    { user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback}/>}
                </Card.Content>
                </Card>
                { user && (<Card fluid>
                    <Card.Content>
                    <Form onSubmit={createComment}>
                    <p>Post comment</p>
                    <div className=" ui fluid input action">
                    <input 
                    onChange={(event) => { setComment(event.target.value)}}
                    value={comment}
                    placeholder="comment..."
                    />
                    <button type="submit" className="ui button teal">
                    Submit
                    </button>
                    </div>
                    </Form>
                    
                    </Card.Content>
                    </Card>)}
                { comments.map((comment) => (
                    
                    <Card fluid key={comment.id}>
                    <Card.Content>
                    { user && user.username === username && (<DeleteButton commentId={comment.id} postId={id}/>)}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow(true)}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                    </Card.Content>
                    </Card>
                ))}
            </Grid.Column>
            
            </Grid.Row>
            </Grid>
        )
    }
    return (<React.Fragment>{postMarkup}</React.Fragment>);
}

const FETCH_POST = gql`
query getPost($postId: ID!) {
    getPost(postId: $postId){
        id
        username
        body
        comments{
            username
            createdAt
            body
            id
        }
        likes{
            username
        }
        commentCount
        likeCount
    }
}
`

export default SinglePost;
