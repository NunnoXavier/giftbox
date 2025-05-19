'use client'

import { actionSendMessage } from '@/actions/formActions/formContatoAction'
import { useState } from 'react';

const FormContato = () => {
  const [ sending, setSending ] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const form = e.currentTarget;          
          const formData = new FormData(form);

          setSending(true);
          const { error } = await actionSendMessage(formData);
          if (error) {
            console.error(error);
            return;
          }

          alert('Mensagem enviada com sucesso!');
          form.reset();

        } catch (error) {
          
        } finally {
          setSending(false);
        }
    }
  
    return (
      <form  className="space-y-4" onSubmit={handleSubmit}>
        <input name="name"
          type="text"
          placeholder="Seu nome"
          className="w-full border border-borda focus:border-pink-400 rounded-lg px-4 py-2 text-texto placeholdertexto-label"
        />
        <input name="email"
          type="email"
          placeholder="Seu e-mail"
          className="w-full border border-borda focus:border-pink-400 rounded-lg px-4 py-2 text-texto placeholdertexto-label"
        />
        <input name="subject"
          type="text"
          placeholder="Assunto"
          className="w-full border border-borda focus:border-pink-400 rounded-lg px-4 py-2 text-texto placeholdertexto-label"
        />
        <textarea name="message"
          placeholder="Sua mensagem..."
          rows={5}
          className="w-full border border-borda focus:border-pink-400 rounded-lg px-4 py-2 text-texto placeholdertexto-label resize-none"
        ></textarea>

        <button
          type="submit"
          disabled={sending}
          className={`${ sending? 'bg-pink-300 animate-pulse':'bg-pink-500 hover:bg-pink-600' } 
            w-full transition text-white font-semibold rounded-lg h-11`}
        >
          {sending ? 'Enviando...' : 'Enviar'}
        </button>
    </form>    
  )
}

export default FormContato