// import Image from "next/image";
import Project from "./components/Project";
import Grid from "./components/Grid";
import { getProjects, getSettings } from "./utils/sanity-utils";
import { Metadata } from "next";

export const revalidate = 3600; // revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "Ahmed Ghazi Web Design + Code",
    description:
      "BASED IN PARIS 18. Angular, Chrome extension, Design, Eshop, JAMStack, MEAN, React, Static, Wordpress",
    openGraph: {
      images: [
        settings.logo?.asset.url ||
          "https://cdn.sanity.io/images/lkqsx233/production/fcd1c48e727e02a67fcf9bb10b0a12476ea995de-1200x630.png",
      ],
    },
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
