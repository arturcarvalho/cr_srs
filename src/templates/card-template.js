import React from "react"
import { graphql } from "gatsby"

import CardContainer from "../components/cardContainer"
import Layout from "../components/layout"
import SEO from "../components/seo"

function CardTemplate(props) {
  const card = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title

  const id = card.frontmatter.id

  const cardArgs = {
    id,
    tags: card.frontmatter.tags,
    title: card.frontmatter.title,
    choices: card.frontmatter.choices,
    correct: card.frontmatter.correct,
    learnMoreUrl: card.frontmatter.learnMoreUrl,
    learnMoreTitle: card.frontmatter.learnMoreTitle,
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
  query CardsBySlug($slug: String!) {
    file {
      sourceInstanceName
    }
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        id
        learnMoreUrl
        learnMoreTitle
        choices
        correct
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
      }
    }
  }
`
