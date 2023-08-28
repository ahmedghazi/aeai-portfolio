import Image from "next/image";
import Project from "./components/Project";
import Grid from "./components/Grid";
import { getProjects, getSettings } from "./utils/sanity-utils";
import { Metadata } from "next";

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "Ahmed Ghazi Web Design + Code",
    description: "website.description",
  };
}

export default async function Home() {
  const projects = await getProjects();
  return (
    <div className='page-home'>
      <div className='projects'>
        <Grid length={projects.length} color='rgba(255, 255, 0, 0.2)' />
        {/* <pre>{JSON.stringify(projects)}</pre> */}
        <div className='_row'></div>
        {projects.map((item, i) => (
          <Project input={item} key={i} />
        ))}
      </div>
    </div>
  );
}
