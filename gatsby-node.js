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
          sort: { fields: [fields___order], order: ASC }
          limit: 1000
        ) {
          edges {
            node {
              html
              fields {
                slug
                order
                type
              }
              frontmatter {
                title
                date
                description
                tags
                choices
                correct
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
    const cards = pages.filter(page => page.node.fields.type === "cards")

    pages.forEach((page, index) => {
      const previous = index === pages.length - 1 ? null : pages[index + 1].node
      const next = index === 0 ? null : pages[index - 1].node

      let component
      let filteredCards = []
      if (page.node.fields.type === "posts") component = post
      if (page.node.fields.type === "cards") component = card
      if (page.node.fields.type === "articles") {
        component = article

        // build list of card nodes from the ids on the article
        if (page.node.frontmatter.cards) {
          page.node.frontmatter.cards.forEach(cardId => {
            const c = cards.find(card => card.node.frontmatter.id === cardId)
            filteredCards.push(c.node)
          })
        }
      }

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

const makeTextSlugFriendly = str => _.kebabCase(str.toLowerCase())

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const basename = path.basename(node.fileAbsolutePath, ".md")
    let urlEnd = node.frontmatter.title

    const folders = path.dirname(node.fileAbsolutePath).split("/")
    const lastFolder = folders[folders.length - 1]
    const secondLastFolder = folders[folders.length - 2]
    let type = lastFolder // used also for posts
    if (secondLastFolder === "articles") {
      const splitName = basename.split("-") // basename is 1 (article) or 1-1 (card)
      console.log(1, basename, urlEnd)

      if (splitName.length === 2) {
        console.log("c")
        type = "cards"
        urlEnd += `-${splitName[1]}`
      }

      if (splitName.length === 1) {
        console.log("a")
        type = "articles"
      }
    }

    // post/title OR card/title OR article/title
    const slug = "/" + type + "/" + makeTextSlugFriendly(urlEnd)

    console.log(2, slug)
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    createNodeField({
      name: `order`,
      node,
      value: parseInt(basename),
    })

    createNodeField({
      name: `type`,
      node,
      value: type,
    })
  }
}
