import React from "react"
import { graphql } from "gatsby"

import CardContainer from "../components/cardContainer"
import Layout from "../components/layout"
import SEO from "../components/seo"

function CardTemplate(props) {
  const card = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title

  const id = card.fields.cardId

  const articleUrl = props.data.article.edges[0].node.fields.slug
  const cardArgs = {
    id,
    title: card.frontmatter.title,
    choices: card.frontmatter.choices,
    correct: card.frontmatter.correct,
    learnMoreUrl: articleUrl,
    html: card.html,
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={card.frontmatter.title}
        description={card.frontmatter.description || card.excerpt}
      />
      <CardContainer {...cardArgs} />
    </Layout>
  )
}

export default CardTemplate

export const pageQuery = graphql`
  query CardsBySlug($slug: String!, $articleId: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    article: allMarkdownRemark(
      filter: { fields: { type: { eq: "articles" }, id: { eq: $articleId } } }
    ) {
      edges {
        node {
          fields {
            id
            slug
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      fields {
        cardId
        articleId
      }
      frontmatter {
        choices
        correct
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
