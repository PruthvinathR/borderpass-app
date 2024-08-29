'use client'

import { ApolloProvider } from "@apollo/client";
import client from "./lib/apollo-client";
import Questionnaire from "./components/Questionnaire";

export default function Home() {
  return (
    <ApolloProvider client={client}>
        <Questionnaire />
    </ApolloProvider>
  );
}
