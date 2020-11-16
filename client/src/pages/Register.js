import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client'

function Register()  {
        const [ errors, setErrors] = useState({});
        const [values, setValues] = useState({
             username: "", 
             email: "",
             password: "",
             confirmPassword: ""
        })
        const onChange = (event) => {
            setValues({ ...values, [event.target.name]: event.target.value });
        }

        const [ addUser, { data, loading }] = useMutation(REGISTER_USER, {
            update(proxy, result){
                console.log('result', result);
            }, 
            onError(err){
                console.log('errors',err);
                setErrors(err.graphQLErrors[0].extensions.exception.errors);
                
            }
        });

        const onSubmit = (event) => {
            event.preventDefault();
            addUser({ variables: values });
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
                label='email' 
                placeholder='email' 
                name='email'
                error={ errors.email ? true : false}
                type="email"
                value={values.email}
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
                <Form.Input fluid 
                label='confirm password' 
                placeholder='confirm password' 
                type="password"
                name='confirmPassword'
                error={ errors.confirmPassword ? true : false}
                value={values.confirmPassword}
                onChange={onChange} 
                />
                <Button type="submit" primary>
                Register
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

const REGISTER_USER = gql`
mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    ){
        register( registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }){
            id
            username
            email
        }
}
`
export default Register;
