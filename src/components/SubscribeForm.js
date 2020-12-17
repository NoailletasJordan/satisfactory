import React from "react"
import SnackbarContext from "../context/SnackbarContext"
import validator from "validator"

export default function SubscribeForm() {
  const { handleOpen } = React.useContext(SnackbarContext)
  const [inputValue, setInputValue] = React.useState("")

  const handleSub = () => {
    console.log(inputValue)
    // Error
    if (!validator.isEmail(inputValue))
      return handleOpen(false, "Email non conforme")

    // Success
    handleOpen(true, "Vous êtes maintenant abonné à Satisfactory")
    setInputValue("")
  }

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <form
      name="subscribeForm"
      method="POST"
      data-netlify-honeypot="bot-field"
      data-netlify="true"
      id="subscribe-form"
      className="subscribe-form"
    >
      <div className="screen-reader-text">
        <label id="subscribe-form-bot-label">
          Don't fill this out if you're human:{" "}
          <input name="bot-field" aria-labelledby="subscribe-form-bot-label" />
        </label>
      </div>
      <div className="form-row">
        <label id="subscribe-form-email-label">
          <span className="screen-reader-text">Email address</span>
          <input
            className="subscribe-email"
            aria-labelledby="subscribe-form-email-label"
            type="email"
            name="email"
            placeholder="Entrez votre email"
            value={inputValue}
            onChange={handleChange}
          />
        </label>
      </div>
      <input
        type="hidden"
        aria-label="subscribe-form-name-label"
        name="form-name"
        value="bot"
      />
      <button className="button" type="button" onClick={handleSub}>
        S'abonner
      </button>
    </form>
  )
}
