import React from "react"
import { graphql } from "gatsby"
import { connect } from "react-redux"

import { onAnswerInReview } from "../store/cardsActions"
import Card from "../components/card/reviewCard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { getCard, getCardsToReview } from "../store/rootReducer"

function CardTemplate(props) {
  const card = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title

  const id = card.fields.id

  const articleUrl = props.data.article.edges[0].node.fields.slug

  const cardArgs = {
    id,
    title: card.frontmatter.title,
    choices: card.frontmatter.choices,
    correct: card.frontmatter.correct,
    learnMoreUrl: articleUrl,
    html: card.html,
    isFlash: card.frontmatter.isFlash,
    cardsToReview: props.cardsToReview,
    onAnswerInReview: props.onAnswerInReview,
    currentCard: props.currentCard,
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={card.frontmatter.title}
        description={card.frontmatter.description || card.excerpt}
      />
      <Card {...cardArgs} />
    </Layout>
  )
}

const mapStateToProps = (state, props) => {
  const id = props.data.markdownRemark.fields.id
  return {
    cardsToReview: getCardsToReview(state),
    currentCard: getCard(state, id),
  }
}

export default connect(
  mapStateToProps,
  { onAnswerInReview }
)(CardTemplate)

// {
// 	"slug": "/cards/4-3",
//   "articleId": "sleep"
// }
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
        id
        articleId
      }
      frontmatter {
        correct
        choices
        isFlash
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
