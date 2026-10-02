import { useState, type FormEvent } from 'react'
import { useT } from '../../context/LanguageContext'
import { SectionHead } from '../ui/SectionHead'
import { Reveal } from '../ui/Reveal'
import { contact, ctBig } from '../../data/profile'

const EMAIL_RE = /^\S+@\S+\.\S+$/

export function Contact() {
  const { t, tr } = useT()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'empty' | 'mail' | 'ok'>('idle')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nm = name.trim()
    const em = email.trim()
    const ms = message.trim()
    if (!nm || !em || !ms) {
      setStatus('empty')
      return
    }
    if (!EMAIL_RE.test(em)) {
      setStatus('mail')
      return
    }
    setStatus('ok')
  }

  const statusText =
    status === 'empty' ? t('form.empty') : status === 'mail' ? t('form.mail') : status === 'ok' ? t('form.ok') : ''

  return (
    <section className="sect sect--contact" id="contact">
      <div className="wrap">
        <SectionHead index="Sec 08" title={t('ct.h')} tail={t('ct.tail')} />
        <div className="contact-grid">
          <Reveal>
            <h3 className="big-line">
              {tr(ctBig.line1)}
              <br />
              {tr(ctBig.line2Before)}
              <em>{tr(ctBig.emphasis)}</em>
            </h3>
            <p style={{ color: '#AFB5B8', maxWidth: '48ch', margin: '0 0 8px' }}>{t('ct.p')}</p>
            <div className="contact-list">
              <a className="cline" href={`mailto:${contact.email}`}>
                <span className="k">Email</span>
                <span className="v">{contact.email}</span>
              </a>
              <a className="cline" href={`tel:${contact.phoneHref}`}>
                <span className="k">{t('ct.k2')}</span>
                <span className="v">{contact.phoneDisplay}</span>
              </a>
              <a className="cline" href={contact.linkedinHref} target="_blank" rel="noopener noreferrer">
                <span className="k">LinkedIn</span>
                <span className="v">{contact.linkedinDisplay}</span>
              </a>
              <a className="cline" href={contact.githubHref} target="_blank" rel="noopener noreferrer">
                <span className="k">GitHub</span>
                <span className="v">{contact.githubDisplay}</span>
              </a>
              <div className="cline">
                <span className="k">{t('ct.k5')}</span>
                <span className="v">{contact.location}</span>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <form className="form" onSubmit={onSubmit} noValidate>
              <div className="mono" style={{ color: 'var(--color-concrete)', marginBottom: 20 }}>
                {t('ct.form')}
              </div>
              <div className="field">
                <label htmlFor="nm">{t('ct.f1')}</label>
                <input
                  id="nm"
                  type="text"
                  placeholder={t('ct.ph1')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="em">{t('ct.f2')}</label>
                <input
                  id="em"
                  type="email"
                  placeholder={t('ct.ph2')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="ms">{t('ct.f3')}</label>
                <textarea
                  id="ms"
                  placeholder={t('ct.ph3')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button className="btn btn--fill" type="submit">
                <span>{t('ct.send')}</span> <i />
              </button>
              <div className={status === 'ok' ? 'form-status ok' : 'form-status'}>{statusText}</div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
