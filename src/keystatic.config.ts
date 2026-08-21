import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        summary: fields.text({
          label: "Summary",
          description: "A one-line description of the project",
          multiline: false,
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Web Design", value: "Web Design" },
            { label: "Mobile Design", value: "Mobile Design" },
            { label: "UI Mockup", value: "UI Mockup" },
          ],
          defaultValue: "Web Design",
        }),
        coverImage: fields.text({
          label: "Cover Image Path",
          defaultValue: "",
        }),
        year: fields.text({
          label: "Year",
          defaultValue: new Date().getFullYear().toString(),
        }),
        role: fields.text({
          label: "Your Role",
          defaultValue: "UI/UX Designer",
        }),
        client: fields.text({
          label: "Client (optional)",
        }),
        liveUrl: fields.url({
          label: "Live URL (optional)",
        }),
        techStack: fields.array(
          fields.text({ label: "Technology" }),
          {
            label: "Tech Stack",
            itemLabel: (props) => props.value || "Technology",
          }
        ),
        featured: fields.checkbox({
          label: "Featured on Home Page",
          defaultValue: true,
        }),
        sortOrder: fields.integer({
          label: "Sort Order",
          defaultValue: 0,
          description: "Lower numbers appear first",
        }),
        content: fields.markdoc({
          label: "Case Study Content",
        }),
      },
    }),
  },
});
