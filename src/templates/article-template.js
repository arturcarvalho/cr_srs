import React from "react"
import { graphql } from "gatsby"

import CardContainer from "../components/cardContainer"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

function ArticlesTemplate(props) {
  const article = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title
  // const { previous, next } = props.pageContext
  const { filteredCards } = props.pageContext

  let cards = null

  if (filteredCards) {
    cards = filteredCards.map(card => {
      const { html, frontmatter } = card

      const cardArgs = {
        id: frontmatter.id,
        title: frontmatter.title,
        learnMoreTitle: frontmatter.learnMoreTitle,
        learnMoreUrl: frontmatter.learnMoreUrl,
        correct: frontmatter.correct,
        choices: frontmatter.choices,
        html,
      }

      return <CardContainer key={card.frontmatter.id} {...cardArgs} />
    })
  }

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
        {article.frontmatter.date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: article.html }} />

      {/*
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
       <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li> 
      </ul>
      */}

      {filteredCards.length > 0 && (
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
  query ArticlesBySlug($slug: String!) {
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
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
