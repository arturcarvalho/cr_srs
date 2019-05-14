import React from "react"
import { graphql } from "gatsby"

import CardContainer from "../components/cardContainer"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

function ArticlesTemplate(props) {
  const article = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title

  let cards = null

  cards = props.data.cards.edges.map(card => {
    const { html, frontmatter, fields } = card.node

    const id = fields.id
    const cardArgs = {
      id,
      title: frontmatter.title,
      learnMoreUrl: article.fields.slug,
      correct: frontmatter.correct,
      choices: frontmatter.choices,
      html,
    }
    return <CardContainer key={id} {...cardArgs} />
  })

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={article.frontmatter.title}
        description={article.frontmatter.description || article.excerpt}
      />
      <h1>{article.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {article.frontmatter.date} {` - ${article.timeToRead} min read`}
      </p>
      <div dangerouslySetInnerHTML={{ __html: article.html }} />

      {cards.length > 0 && (
        <>
          <br />

          <hr />
          <h3>Training cards</h3>
          <div>{cards}</div>
        </>
      )}
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
    </Layout>
  )
}

export default ArticlesTemplate

export const pageQuery = graphql`
  query ArticlesBySlug($slug: String!, $articleId: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    cards: allMarkdownRemark(
      filter: {
        fields: { type: { eq: "cards" }, articleId: { eq: $articleId } }
      }
    ) {
      edges {
        node {
          html
          fields {
            id
            slug
            articleId
          }
          frontmatter {
            title
            choices
            correct
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 160)
      html
      fields {
        slug
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
