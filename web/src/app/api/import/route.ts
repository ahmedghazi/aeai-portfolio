import { NextRequest, NextResponse } from "next/server";
import { createClient, groq } from "next-sanity";
import { v4 as uuidv4 } from "uuid";
import { Project } from "@/app/types/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json(); // res now contains body
    // console.log(body);

    // const result = await _mutation(body.data);
    // const json = await result.json();
    for (let index = 0; index < body.length; index++) {
      const item = body[index];
      const result = await _mutation(item.data);
      console.log(result);
    }

    const json_response = {
      status: "success",
      data: JSON.stringify(body),
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.log(error);
    const error_response = {
      status: "error",
      message: error.message,
      raw: error,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

const _mutation = async (data: any) => {
  const client = createClient({
    projectId: "lkqsx233",
    dataset: "production",
    token: process.env.SANITY_AUTH_TOKEN,
    apiVersion: "2023-03-04",
    useCdn: true,
  });

  const { title, url, year, category } = data;
  console.log(title);
  const tags = [{}];
  const mutations = [
    {
      createIfNotExists: {
        // _id: `drafts.${uuidv4()}`,
        _id: uuidv4(),
        _type: "project",
        title: title[0]?.text,
        slug: {
          current: _slugify(title[0]?.text),
        },
        url: url[0]?.text,
        year: `${year}`,
        // tags: category.data.name[0].text,
        // {...data}
      },
    },
  ];

  const res = await client.mutate(mutations);
  return res;
};

function _slugify(str: string) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}
