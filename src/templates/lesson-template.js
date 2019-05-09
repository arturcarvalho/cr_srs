import React from "react"
import { graphql } from "gatsby"

import Card from "../components/card"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

function LessonsTemplate(props) {
  const lesson = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title
  // const { previous, next } = props.pageContext
  const { filteredCards } = props.pageContext

  let cards = null

  if (filteredCards) {
    cards = filteredCards.map(card => {
      const { html, frontmatter } = card
      console.log(html, frontmatter.id)
      return null //<Card key={card.frontmatter.id} id={card.frontmatter.id} />
    })
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={lesson.frontmatter.title}
        description={lesson.frontmatter.description || lesson.excerpt}
      />
      <h1>{lesson.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {lesson.frontmatter.date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: lesson.html }} />

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

      <h3>Training cards</h3>
      {cards}
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
    </Layout>
  )
}

export default LessonsTemplate

export const pageQuery = graphql`
  query LessonsBySlug($slug: String!) {
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
