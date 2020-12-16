import React, { useState } from "react"
import _ from "lodash"
import validator from "validator"

import { htmlToReact, markdownify } from "../utils"

export default function SectionContact(props) {
  let section = _.get(props, "section", null)
  const [data, setData] = useState(initialState)

  const handleDataChange = (fieldName) => (event) =>
    setData({ ...data, [fieldName]: event.target.value })

  const handleSubmit = async () => {
    console.log("sumbit")
    if (!isValidData()) return

    const resBrut = await fetch("/.netlify/functions/orders", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })

    const res = await resBrut.json()
    console.log(res)
    if (resBrut.status >= 200 && resBrut.status < 300 && !res.error) {
      // Success
      setData(initialState)
      return
    } else {
      // Error
      console.log("Error:", res.message)
    }
  }

  const isValidData = () => {
    let isValid = true
    let message = ""

    // Description
    if (data.desc.length < 10) {
      isValid = false
      message = "Description trop courte"
    }

    //Phone
    if (!validator.isMobilePhone(data.phone)) {
      isValid = false
      message = "Numéro de téléphone non conforme"
    }

    // Email
    if (!validator.isEmail(data.email)) {
      isValid = false
      message = "Email non conforme"
    }

    // Empty fields
    for (const property in data) {
      if (!data[property].length) {
        isValid = false
        message = "Veuillez remplir tous les champs"
      }
    }

    // Too big fields
    for (const property in data) {
      if (data[property].length > 700) {
        isValid = false
        message = "Les champs ne peuvent exéder 700 caractères"
      }
    }

    if (!isValid) console.log(message)

    return isValid
  }

  return (
    <section
      id={_.get(section, "section_id", null)}
      className={
        "block contact-block bg-" + _.get(section, "background", null) + "outer"
      }
    >
      <div className="block-header inner-small">
        {_.get(section, "title", null) && (
          <h2 className="block-title">{_.get(section, "title", null)}</h2>
        )}
        {_.get(section, "subtitle", null) && (
          <p className="block-subtitle">
            {htmlToReact(_.get(section, "subtitle", null))}
          </p>
        )}
      </div>
      <div className="block-content inner-medium">
        {markdownify(_.get(section, "content", null))}
        <form
          name="contactForm"
          method="POST"
          data-netlify-honeypot="bot-field"
          data-netlify="true"
          id="contact-form"
          className="contact-form"
        >
          <p className="screen-reader-text">
            <label id="contact-form-bot-label">
              Don't fill this out if you're human:{" "}
              <input
                name="bot-field"
                aria-labelledby="contact-form-bot-label"
              />
            </label>
          </p>
          <p className="form-row">
            <label
              id="contact-form-name-label"
              htmlFor="contact-form-name"
              className="form-label"
            >
              NOM Prénom
            </label>
            <input
              type="text"
              name="name"
              id="contact-form-name"
              aria-labelledby="contact-form-name-label"
              className="form-input"
              value={data.fullName}
              onChange={handleDataChange("fullName")}
            />
          </p>
          <p className="form-row">
            <label
              id="contact-form-email-label"
              htmlFor="contact-form-email"
              className="form-label"
            >
              Adresse Email
            </label>
            <input
              type="email"
              name="email"
              id="contact-form-email"
              aria-labelledby="contact-form-email-label"
              className="form-input"
              value={data.email}
              onChange={handleDataChange("email")}
            />
          </p>
          <p className="form-row">
            <label
              id="contact-form-phone-label"
              htmlFor="contact-form-phone"
              className="form-label"
            >
              Numéro de téléphone
            </label>
            <input
              type="text"
              name="phone"
              id="contact-phone-name"
              aria-labelledby="contact-form-phone-label"
              className="form-input"
              value={data.phone}
              onChange={handleDataChange("phone")}
            />
          </p>
          <p className="form-row">
            <label
              id="contact-form-phone-label"
              htmlFor="contact-form-phone"
              className="form-label"
            >
              Offre
            </label>
            <select
              type="text"
              name="phone"
              id="contact-phone-name"
              aria-labelledby="contact-form-phone-label"
              className="form-input"
              value={data.offer}
              onChange={handleDataChange("offer")}
            >
              <option value="">--Choisissez une valeur--</option>
              <option value="statique">Site statique</option>
              <option value="blog">Blog</option>
              <option value="e-commerce">E-commerce</option>
            </select>
          </p>
          <p className="form-row">
            <label
              id="contact-form-message-label"
              htmlFor="contact-form-message"
              className="form-label"
            >
              Votre projet en quelques mots
            </label>
            <textarea
              name="message"
              id="contact-form-message"
              aria-labelledby="contact-form-message-label"
              className="form-textarea"
              rows="7"
              value={data.desc}
              onChange={handleDataChange("desc")}
            />
          </p>
          <input
            type="hidden"
            aria-label="contact-form-name"
            name="form-name"
            value="contactForm"
          />
          <p className="form-row form-submit">
            <button type="button" className="button" onClick={handleSubmit}>
              Envoyer
            </button>
          </p>
        </form>
      </div>
    </section>
  )
}

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  offer: "",
  desc: "",
}
