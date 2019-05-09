const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const post = path.resolve(`./src/templates/post-template.js`)
  const lesson = path.resolve(`./src/templates/lesson-template.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [fields___basename], order: ASC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                basename
                folder
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const pages = result.data.allMarkdownRemark.edges

    pages.forEach((page, index) => {
      const previous = index === pages.length - 1 ? null : pages[index + 1].node
      const next = index === 0 ? null : pages[index - 1].node

      let component
      if (page.node.fields.folder === "posts") component = post
      if (page.node.fields.folder === "lessons") component = lesson

      createPage({
        path: page.node.fields.slug,
        component,
        context: {
          slug: page.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode }) // file name

    // janky way to build the url: /folder/num/kebab-title
    const folder = path.dirname(node.fileAbsolutePath).match(/([^\/]*)\/*$/)[1]
    const kebabTitle = _.kebabCase(node.frontmatter.title)
    // used to number the lessons
    const basename = path.basename(node.fileAbsolutePath, ".md")

    const slug = "/" + folder + "/" + kebabTitle

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    createNodeField({
      name: `basename`,
      node,
      value: basename,
    })

    createNodeField({
      name: `folder`,
      node,
      value: folder,
    })
  }
}
