import React from "react"
import { graphql } from "gatsby"
import { connect } from "react-redux"

import Card from "../components/card/articleCard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import StatusBall from "../components/statusBall"
import showArticleStatus from "../utils/showArticleStatus"
import { answer } from "../store/cardsActions"

function ArticlesTemplate(props) {
  const article = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title

  let cards = null

  const statusColor = showArticleStatus(props.data.cards.edges, props.cardsById)

  cards = props.data.cards.edges.map(card => {
    const { html, frontmatter, fields } = card.node

    const id = fields.id
    const cardArgs = {
      answer: props.answer,
      cardsById: props.cardsById,
      expanded: false,
      id,
      title: frontmatter.title,
      correct: frontmatter.correct,
      choices: frontmatter.choices,
      html,
    }
    return <Card key={id} {...cardArgs} />
  })

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={article.frontmatter.title}
        description={article.frontmatter.description || article.excerpt}
      />
      <h1>
        <StatusBall statusColor={statusColor} />
        {article.frontmatter.title}
      </h1>
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
        <section>
          <h1>Training</h1>
          {cards}
        </section>
      )}
    </Layout>
  )
}

const mapState = state => {
  return {
    cardsById: state.cards.cardsById,
  }
}

export default connect(
  mapState,
  { answer }
)(ArticlesTemplate)

export const pageQuery = graphql`
  query ArticlesBySlug($slug: String!, $articleId: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    cards: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
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
      timeToRead
      fields {
        slug
        cardId
        articleId
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
