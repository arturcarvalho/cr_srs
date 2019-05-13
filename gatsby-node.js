const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const post = path.resolve(`./src/templates/post-template.js`)
  const article = path.resolve(`./src/templates/article-template.js`)
  const card = path.resolve(`./src/templates/card-template.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [fields___basename], order: ASC }
          limit: 1000
        ) {
          edges {
            node {
              html
              fields {
                slug
                basename
                folder
              }
              frontmatter {
                id
                title
                date
                description
                tags
                choices
                learnMoreUrl
                learnMoreTitle
                correct
                cards
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

    // Create all types of pages.
    const pages = result.data.allMarkdownRemark.edges

    // I'm being hacky again, I'm getting all the card nodes so i can use them
    // inside the articles. But I don't want to learn graphql just to do a join...
    const cards = pages.filter(page => page.node.fields.folder === "cards")

    pages.forEach((page, index) => {
      const previous = index === pages.length - 1 ? null : pages[index + 1].node
      const next = index === 0 ? null : pages[index - 1].node

      let component
      let filteredCards = []
      if (page.node.fields.folder === "articles") {
        component = article

        // build list of card nodes from the ids on the article
        if (page.node.frontmatter.cards) {
          page.node.frontmatter.cards.forEach(cardId => {
            const c = cards.find(card => card.node.frontmatter.id === cardId)
            filteredCards.push(c.node)
          })
        }
      }
      if (page.node.fields.folder === "posts") component = post
      if (page.node.fields.folder === "cards") component = card

      createPage({
        path: page.node.fields.slug,
        component,
        context: {
          slug: page.node.fields.slug,
          filteredCards,
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
    const kebabTitle = _.kebabCase(node.frontmatter.title.toLowerCase())
    // used to number the articles
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
