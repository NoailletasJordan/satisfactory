import React, { useState } from "react"
import { Helmet } from "react-helmet"
import _ from "lodash"

import { withPrefix } from "../utils"
import "../sass/main.scss"
import Header from "./Header"
import Footer from "./Footer"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import SnackbarContext from "../context/SnackbarContext"

export default function Body(props) {
	let title =
		_.get(props, "pageContext.frontmatter.title", null) +
		" | " +
		_.get(props, "pageContext.site.siteMetadata.title", null)
	if (_.get(props, "pageContext.frontmatter.meta_title", null)) {
		title = _.get(props, "pageContext.frontmatter.meta_title", null)
	}

	// Snackbar
	const [open, setOpen] = useState(false)
	const [isSuccess, setIsSuccess] = useState(true)
	const [snackMessage, setSnackMessage] = useState("")
	const handleOpen = (successBool, message) => {
		setIsSuccess(successBool)
		setOpen(true)
		setSnackMessage(message)
	}
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return
		}
		setOpen(false)
	}

	return (
		<React.Fragment>
			<SnackbarContext.Provider value={{ handleOpen, handleClose }}>
				<Helmet>
					<title>{title}</title>
					<meta property="og:title" content="Satisfactory" />
					<meta
						property="og:image"
						content="https://jordannoailletas.com/assets/satisfactory.png"
					/>
					<meta
						property="og:description"
						content="Service de création de sites web"
					/>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
					<meta name="google" content="notranslate" />
					<meta
						name="description"
						content={_.get(
							props,
							"pageContext.frontmatter.meta_description",
							null
						)}
					/>
					{_.get(props, "pageContext.frontmatter.canonical_url", null) ? (
						<link
							rel="canonical"
							href={_.get(props, "pageContext.frontmatter.canonical_url", null)}
						/>
					) : (
						_.get(props, "pageContext.site.siteMetadata.domain", null) &&
						(() => {
							let domain = _.trim(
								_.get(props, "pageContext.site.siteMetadata.domain", null),
								"/"
							)
							let page_url = withPrefix(_.get(props, "pageContext.url", null))
							return <link rel="canonical" href={domain + page_url} />
						})()
					)}
					{_.get(props, "pageContext.frontmatter.no_index", null) && (
						<meta name="robots" content="noindex,follow" />
					)}
					<link
						href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,700i"
						rel="stylesheet"
					/>
				</Helmet>
				<div
					id="page"
					className={
						"site palette-" +
						_.get(props, "pageContext.site.siteMetadata.palette", null)
					}
				>
					<Header {...props} />

					<main id="content" className="site-content">
						{props.children}
					</main>

					<Footer {...props} />
				</div>
				<div style={{ position: "absolute" }}>
					<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
						<Alert
							onClose={handleClose}
							severity={isSuccess ? "success" : "error"}
						>
							{snackMessage}
						</Alert>
					</Snackbar>
				</div>
			</SnackbarContext.Provider>
		</React.Fragment>
	)
}

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}
