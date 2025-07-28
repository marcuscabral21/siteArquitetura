// pages/teste-supabase.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseclient'

export default function TesteSupabase() {
  const [arquitetos, setArquitetos] = useState([])
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const fetchArquitetos = async () => {
      const { data, error } = await supabase
        .from('arquiteto')
        .select('*')
        .limit(5) // pegar só os 5 primeiros para testar

      if (error) {
        setErro(error.message)
      } else {
        setArquitetos(data)
      }
    }

    fetchArquitetos()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Conexão com Supabase</h1>
      {erro && <p style={{ color: 'red' }}>Erro: {erro}</p>}
      {arquitetos.length === 0 && !erro && <p>Carregando dados...</p>}
      <ul>
        {arquitetos.map((arq) => (
          <li key={arq.id}>
            <strong>{arq.nome}</strong> - {arq.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
