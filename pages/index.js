import React from 'react';
import Head from 'next/head';
import { SimpleGrid, Container } from '@chakra-ui/react';

export default function Home ({}) {
  return (
    <>
      <Head>
        <title>Bot</title>
      </Head>
      <Container minW="70%" w="100%">
        <SimpleGrid minChildWidth="16rem" spacing="1rem">
          <a href="Chatbot">Go</a>
        </SimpleGrid>
      </Container>
    </>
  );
}