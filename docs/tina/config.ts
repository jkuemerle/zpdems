import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "/src",
  },
  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "/src",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "/src/posts",
        defaultItem: () => {
          return { 
            updated: "Last Modified",
            layout: "post",
            tags: ["post"],
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            ui: {
              dateFormat: "YYYY-MM-DD",
              parse: (value) => value && value.format('YYYY-MM-DD'),
            },
          },
          {
            type: "string",
            name: "updated",
            label: "Updated",
          },
          {
            type: "string",
            name: "layout",
            label: "layout",
          },      
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "/src/pages",
        format: "mdx",
        defaultItem: () => {
          return { 
            layout: "page",
          }
        },
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
          },
          {
            type: "string",
            name: "layout",
            label: "Layout",
          },
          {
            type: "string",
            name: "permalink",
            label: "Permalink"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
