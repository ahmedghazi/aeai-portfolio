import { createClient, groq } from "next-sanity";
import { Project, Settings, Tag } from "../types/schema";

export async function getSettings(): Promise<Settings> {
  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-03-04",
    useCdn: true,
  });

  return client.fetch(
    groq`*[_type == "settings"][0]{
      ...,


    }`
  );
}

export async function getProjects(): Promise<Project[]> {
  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-03-04",
    useCdn: true,
  });

  return client.fetch(groq`*[_type == "project"]{
    ...,
    tags[]->
  } | order(year desc)`);
}

export async function getAllTags(): Promise<Tag[]> {
  const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-03-04",
    useCdn: true,
  });

  return client.fetch(groq`*[_type == "tag"] | order(title asc)`);
}
