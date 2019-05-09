import React from "react"
import { graphql } from "gatsby"

import Card from "../components/card"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

function CardTemplate(props) {
  const post = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title

  const cardArgs = {
    title: post.frontmatter.title,
    choices: post.frontmatter.choices,
    correct: post.frontmatter.correct,
    learnMoreUrl: post.frontmatter.learnMoreUrl,
    learnMoreTitle: post.frontmatter.learnMoreTitle,
    html: post.html,
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Card {...cardArgs} />

      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
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
        learnMoreUrl
        learnMoreTitle
        choices
        correct
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
