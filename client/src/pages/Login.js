import gql from 'graphql-tag';
import React, { useState,useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client'
import {useForm} from '../utils/hooks';
import { AuthContext } from '../context/auth';


function Register(props)  {
        const context = useContext(AuthContext);
        const [ errors, setErrors] = useState({});
        const initialState = {
            username: '', 
             password: '',
        }

       
        const { onSubmit, onChange, values} = useForm(loginUserCallback, initialState);

        const [ loginUser, { data, loading }] = useMutation(LOGIN_USER, {
            update(proxy, { data: { login: userData}}){
                context.login(userData);
                props.history.push('/');
            }, 
            onError(error){
                console.log(JSON.stringify(error));
                setErrors(error.graphQLErrors[0].extensions.errors);
                
            }
        });
        function loginUserCallback(){
            loginUser({ variables: values });
        }


        return (
            <div className="form-container">
                <Form onSubmit={onSubmit} noValidate className={ loading ? 'loading' : ''}>
                <Form.Input fluid 
                label='username' 
                placeholder='username' 
                name='username'
                error={ errors.username ? true : false}
                type="name"
                value={values.username}
                onChange={onChange} 
                />
                <Form.Input fluid 
                label='password' 
                placeholder='password' 
                name='password'
                error={ errors.password ? true : false}
                type="password"
                value={values.password}
                onChange={onChange} 
                />
                <Button type="submit" primary>
                Login
                </Button>
                </Form>
                { Object.keys(errors).length > 0 
                    && 
                (<div className="ui error message">
                <ul>
                { (Object.values(errors).map((error) => 
                    <li key={error}> {error} </li>
                ))}
                </ul>
                </div>)
                }
            </div>
        );
}

const LOGIN_USER = gql`
mutation Login(
    $username: String!
    $password: String!
    )
        {
            login( username: $username, password: $password){
            id
            username
            email
            token
            }
        }
`
export default Register;
