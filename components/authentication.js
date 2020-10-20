import React, {useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useAuth} from '../lib/auth'
import {useForm} from 'react-hook-form'
import { ButtonGroup, Button, Box, Collapse, Divider, Flex, Input, Spinner, Stack, Text } from '@chakra-ui/core'


const Authentication = () => {
  const auth = useAuth();

  const [issubmiting, setIssubmiting] = useState(false);

  const { errors, register, handleSubmit, watch } = useForm();
  const onSubmit = (data, e) => {
    setIssubmiting(true)
    if(signupvisible){
      auth.signup(data.email, data.password, data.nickname)
    } else {
      auth.signin(data.email, data.password)
    }
    
    setIssubmiting(false)
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
          
          <Box px={70} py={50} borderWidth="1px" borderColor="#CBD5E0" rounded="lg" overflow="hidden">
          <Flex direction="column" align="center" justify="center">
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
                    required: signupvisible, 
                    minLength: 6
                    })}
                  isInvalid={watchPass != watchConfirm}
                  errorBorderColor="red.300"
                  mb={4}
                />
                <Input 
                  name="nickname" 
                  placeholder="Display Name"
                  ref={register ({ 
                    required: signupvisible, 
                    minLength: 4
                  })}
                  isInvalid={errors.nickname ? true : false}
                  errorBorderColor="red.300"
                />
              </Collapse>
              <Flex align="center" justify="center" >
                {signupvisible ? 
                  <Button id="signup" variantColor="teal" size="md" type="submit" isLoading={issubmiting}>
                    Sign Up
                  </Button>
  
                  :<Button id="signin" type="submit" isLoading={issubmiting}>
                    Sign In
                  </Button>
                }
              </Flex>
              
            </Stack>
            </Flex>
          </Box>
          
        </form>
      </main>
    </div>
}

export default Authentication