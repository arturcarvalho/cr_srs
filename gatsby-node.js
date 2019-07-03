const path = require(`path`)
const _ = require("lodash")

const makeTextSlugFriendly = str => _.kebabCase(str.toLowerCase())

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const basename = path.basename(node.fileAbsolutePath, ".md")

    // Files starting with underscore are drafts.
    const isDraft = name => /^_.*/.test(name)

    // Ignore drafts. It generates null node fields. 
    // They are filtered on createPages.
    if (isDraft(basename)) {
      return
    }

    const folders = path.dirname(node.fileAbsolutePath).split("/")
    const lastFolder = folders[folders.length - 1]
    const secondLastFolder = folders[folders.length - 2]

    let type
    let slug

    if (secondLastFolder === "articles") {
      // the articles are the ones which
      // have the filename equal to the folder they're in.
      if (basename === lastFolder) {
        type = "articles"
        slug = "/" + type + "/" + makeTextSlugFriendly(node.frontmatter.title)
      } else {
        type = "cards"
        slug = "/" + type + "/" + basename
      }
    } else {
      // posts
      type = "posts"
      slug = "/" + type + "/" + makeTextSlugFriendly(node.frontmatter.title)
    }

    // needed on articles and cards
    createNodeField({
      name: `articleId`,
      node,
      value: lastFolder,
    })

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    createNodeField({
      name: `id`,
      node,
      value: basename,
    })

    createNodeField({
      name: `type`,
      node,
      value: type,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const post = path.resolve(`./src/templates/post-template.js`)
  const article = path.resolve(`./src/templates/article-template.js`)
  const card = path.resolve(`./src/templates/card-template.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [fields___id], order: ASC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                id
                type
                articleId
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

    // Create all types of pages, but ignore the drafts (null fields)
    const pages = result.data.allMarkdownRemark.edges.filter(p => !!p.fields)

    // check pages don't have same name
    const slugs = pages.map(page => page.node.fields.slug)
    if (slugs.length !== new Set(slugs).size) throw "Duplicate pages"

    pages.forEach((page, index) => {
      const previous = index === pages.length - 1 ? null : pages[index + 1].node
      const next = index === 0 ? null : pages[index - 1].node

      let component
      if (page.node.fields.type === "posts") component = post
      if (page.node.fields.type === "cards") component = card
      if (page.node.fields.type === "articles") component = article

      // context prop is used for args in graphql
      let context = createPage({
        path: page.node.fields.slug,
        component,
        context: {
          slug: page.node.fields.slug,
          articleId: page.node.fields.articleId,
          previous,
          next,
        },
      })
    })

    return null
  })
}
