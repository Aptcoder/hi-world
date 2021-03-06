import React, { useContext} from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const Home = () =>  {

        const { user } = useContext(AuthContext);
        const { loading, error, data} = useQuery(FETCH_POSTS_QUERY);
        if(loading) console.log(loading);
        if(error)  console.log(error);
        if(data)  console.log(data);

        return (
            <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                    <PostForm/>
                    </Grid.Column>
                )}
                {
                    loading && error ? ( <h2>loading posts...</h2> )
                     : (
                        data
                        && 
                        <Transition.Group duration={500}>
                        {data.getPosts.map(
                            (post) => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20}}>
                            <PostCard post={post}/>
                            </Grid.Column>
                            )
                        )
                        }
                        </Transition.Group>
                        )
                }
            </Grid.Row>
            </Grid>
        );
}


export default Home;
