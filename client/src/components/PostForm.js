import React, {useState} from 'react';
import { Form, Button  } from 'semantic-ui-react';
import { useForm} from '../utils/hooks';
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../utils/graphql";
import { useMutation } from "@apollo/client";

const PostForm = () => {
    const createPostCallback = () => {
        createPost({ variables: values });
    };

    const [error, setError] = useState(null);

    const { onChange, onSubmit, values } = useForm(createPostCallback, { body: ' '});

    const [createPost,] = useMutation(CREATE_POST_MUTATION, {
        update: (proxy, result) => {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            console.log('data', data);
            const posts = [ ...data.getPosts,result.data.createPost ]
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data : { ...data, getPosts: posts}
            })
            // console.log(data);
            setError(null);
            values.body = '';
        },
        onError: (error) => {
             console.log('error', JSON.stringify(error))
             setError(error.graphQLErrors[0].message);
            }
    });

    
    return (
        <div>
        <Form onSubmit={onSubmit}>
        <Form.Field>
            <Form.Input 
                placeholder="Hi World"
                name="body"
                onChange={onChange}
                value={values.body}
            />
            <Button color='teal' type='submit'>
                Submit
            </Button>
        </Form.Field>
        </Form>
        { error && 
            (
                <div className="ui message error">
                <ul className='list'>
                <li>{error}</li>
                </ul>
                </div>
            )}
        </div>
    );
}

export default PostForm;
