import React, {useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useAuth} from '../lib/auth'
import {useForm} from 'react-hook-form'
import { ButtonGroup, Button, Box, Collapse, Divider, Flex, Input, Stack, Text } from '@chakra-ui/core'


const Home = () => {
  const auth = useAuth();

  const { errors, register, handleSubmit, watch } = useForm();
  const onSubmit = (data, e) => {
    if(signupvisible){
      auth.signup(data.email, data.password)
    } else {
      auth.signin(data.email, data.password)
    }

  }

  const [signupvisible, setSignupvisible] = useState(false);

  const watchPass = watch("password");
  const watchConfirm = watch("confirmpassword");

  return <div className={styles.container}>
      <Head>
        <title>CoNotes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Box bg="grey-100" px={70} py={50} border="1px" rounded="lg" overflow="hidden">
          <center>
            <Text fontSize="4xl" mb={5}><b>Co</b>Notes</Text>
            <ButtonGroup spacing={4} mb={4}>
              <Flex>
                <Button variantColor="teal" variant={signupvisible ? "ghost" : "solid"} onClick={(e) => setSignupvisible(false)}>
                  SignIn
                </Button>

                <Divider orientation="vertical" />

                <Button variantColor="teal" variant={signupvisible ? "solid" : "ghost"} onClick={(e) => setSignupvisible(true)}>
                  SignUp
                </Button>
              </Flex>
            </ButtonGroup>
          </center>
            
            <Stack spacing={4}>
              <Input 
                name="email" 
                placeholder="Email"
                ref={register ({ 
                  required: true, 
                  pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                })}
                isInvalid={errors.email ? true : false}
                errorBorderColor="red.300"
              />

              <Input 
                name="password"
                placeholder="Password" 
                type="password"
                ref={register ({
                  required: true, 
                  minLength: 6
                  })}
                isInvalid={errors.password ? true : false}
                errorBorderColor="red.300"
              />

              <Collapse isOpen={signupvisible}>
                <Input 
                  name="confirmpassword"
                  placeholder="Confirm Password" 
                  type="password"
                  ref={register ({
                    required: true, 
                    minLength: 6
                    })}
                  isInvalid={watchPass != watchConfirm}
                  errorBorderColor="red.300"
                />
              </Collapse>

              {signupvisible ? 
                <Button id="signup" variantColor="teal" size="md" type="submit">
                  Sign Up
                </Button>

                :<Button id="signin" type="submit">
                  Sign In
                </Button>
              }
            </Stack>
          </Box>
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
}

export default Home