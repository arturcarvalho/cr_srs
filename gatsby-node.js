const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
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
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
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

    let slug
    if (folder === "lessons") {
      slug = "/" + folder + value + kebabTitle
    } else {
      slug = "/" + folder + "/" + kebabTitle
    }

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
