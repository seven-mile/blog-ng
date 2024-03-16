import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import IconButton from "./icon-button"
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

const Layout = ({ location, title, subtitle, children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          social {
            email
            twitter
            github
          }
        }
      }
      gitCommit(latest: { eq: true }) {
        hash
      }
    }
  `)
  
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <>
        <div>
          <h1 className="main-heading">
            <Link to="/">{title}</Link>
          </h1>
          <h4 className="main-subtitle">{subtitle}</h4>
        </div>
        <span style={{ flexGrow: 1 }} />
        <div className="main-contacts">
          <IconButton width="2em" height="2em" link={`https://github.com/${data.site.siteMetadata.social?.github}`} icon={faGithub} />
          <IconButton width="2em" height="2em" link={`mailto:${data.site.siteMetadata.social?.email}`} icon={faEnvelope} />
        </div>
      </>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  const revision = data.gitCommit.hash;

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        Generated from
        {` `}
        <a href={`https://github.com/seven-mile/blog-ng${(revision ? `/commit/${revision}` : '')}`}>blog-ng</a>
        {` `}
        @ {new Date().toLocaleString()} by
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>.
      </footer>
    </div>
  )
}

export default Layout
