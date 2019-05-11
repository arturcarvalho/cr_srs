import React from "react"
import { graphql } from "gatsby"
import { connect } from "react-redux"

import Card from "../components/card"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { answer } from "../state/progressActions"
import isCardCorrect from "../utils/isCardCorrect"

function CardTemplate(props) {
  const card = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title

  const id = card.frontmatter.id

  const isCorrect = isCardCorrect(id, props.answersById)

  const cardArgs = {
    answer: props.answer, // fn
    id,
    isCorrect,
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
      <Card {...cardArgs} />

      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
    </Layout>
  )
}

const mapState = state => {
  return {
    answersById: state.progress.answersById,
  }
}

export default connect(
  mapState,
  { answer }
)(CardTemplate)

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
      }
    }
  }
`
