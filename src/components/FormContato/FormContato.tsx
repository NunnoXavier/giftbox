'use client'

import { actionSendMessage } from '@/actions/formActions/formContatoAction'
import { useState } from 'react'
import Button from '../genericos/Buttons/Button'

const FormContato = () => {
  const [ sending, setSending ] = useState(false)
  const [ sucess, setSucess ] = useState(false)
  const [ error, setError ] = useState(false)
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
          const form = e.currentTarget;          
          const formData = new FormData(form)

          setSending(true)
          const { error } = await actionSendMessage(formData)
          if (error) {
            console.error(error)
            setError(true)
            return;
          }

          setSucess(true)
          form.reset()

        } catch (error) {
          setError(true)
        } finally {
          setSending(false)
        }
    }
  
    return (
      <form  className="space-y-4" onSubmit={handleSubmit}>
        <input name="name"
          type="text"
          placeholder="Seu nome"
          className="w-full border border-borda focus:border-pink-400 rounded-lg px-4 py-2 text-texto placeholdertexto-label"
          required
        />
        <input name="email"
          type="email"
          placeholder="Seu e-mail"
          className="w-full border border-borda focus:border-pink-400 rounded-lg px-4 py-2 text-texto placeholdertexto-label"
          required
        />
        <input name="subject"
          type="text"
          placeholder="Assunto"
          className="w-full border border-borda focus:border-pink-400 rounded-lg px-4 py-2 text-texto placeholdertexto-label"
          required
        />
        <textarea name="message"
          placeholder="Sua mensagem..."
          rows={5}
          className="w-full border border-borda focus:border-pink-400 rounded-lg px-4 py-2 text-texto placeholdertexto-label resize-none"
          required
        ></textarea>

        <Button
          type="submit"
          loading={sending}
          sucess={sucess} error={error} setSucess={setSucess} setError={setError}
          className={`w-full`}
        >
          Enviar
        </Button>
    </form>    
  )
}

export default FormContato