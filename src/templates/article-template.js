import React from "react"
import { graphql } from "gatsby"
import { connect } from "react-redux"

import ArticleCard from "../components/card/articleCard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import StatusBall from "../components/statusBall/statusBall"
import showArticleStatus from "../utils/showArticleStatus"
import { onAnswerInArticle } from "../store/cardsActions"
import styles from "./article.module.css"

function ArticlesTemplate(props) {
  const article = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title

  let cards = null

  const status = showArticleStatus(props.data.cards.edges, props.cardsById)

  cards = props.data.cards.edges.map(card => {
    const { html, frontmatter, fields } = card.node

    const id = fields.id
    const cardArgs = {
      id,
      onAnswerInArticle: props.onAnswerInArticle,
      cardsById: props.cardsById,
      expanded: false,
      title: frontmatter.title,
      correct: frontmatter.correct,
      choices: frontmatter.choices,
      isFlash: frontmatter.isFlash,
      html,
    }
    return <ArticleCard key={id} {...cardArgs} />
  })

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={article.frontmatter.title}
        description={article.frontmatter.description || article.excerpt}
      />
      <h1>
        <StatusBall status={status} />
        <span className={styles.title}>{article.frontmatter.title}</span>
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
        <section className={styles.cards}>
          <h1>Training</h1>
          <em>
            Every correct card will <strong>eventually</strong> appear in your
            bonus training.
          </em>
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
  { onAnswerInArticle }
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
            isFlash
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
        articleId
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
