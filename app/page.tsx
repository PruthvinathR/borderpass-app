'use client'

import Image from "next/image";
import styles from "./page.module.css";
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
