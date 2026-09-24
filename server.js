const express = require('express')
const fs = require('fs')

const app = express()
const PORT = 3001

app.use(express.json())
app.use(express.static('client'))

function lerDados() {
    const dados = fs.readFileSync('dados.json', 'utf8')
    return JSON.parse(dados)
}

function salvarDados(dados) {
    fs.writeFileSync('dados.json', JSON.stringify(dados, null, 4))
}

// GET - listar todos
app.get('/usos', (req, res) => {
    const dados = lerDados()
    res.json(dados)
})

// GET - buscar por id
app.get('/usos/:id', (req, res) => {
    const dados = lerDados()
    const id = Number(req.params.id)

    const uso = dados.find(item => item.id === id)

    if (!uso) {
        return res.status(404).json({
            mensagem: 'Uso de IA não encontrado'
        })
    }

    res.json(uso)
})

// GET - buscar por tipo
app.get('/usos/tipo/:tipo', (req, res) => {
    const dados = lerDados()
    const tipo = req.params.tipo.toLowerCase()

    const resultado = dados.filter(item =>
        item.tipo.toLowerCase() === tipo
    )

    res.json(resultado)
})

// GET - buscar por nível de risco
app.get('/usos/risco/:nivel', (req, res) => {
    const dados = lerDados()
    const nivel = req.params.nivel.toLowerCase()

    const resultado = dados.filter(item =>
        item.nivel_risco.toLowerCase() === nivel
    )

    res.json(resultado)
})

// POST - cadastrar uso
app.post('/usos', (req, res) => {
    const dados = lerDados()

    const novoId = dados.length > 0
        ? Math.max(...dados.map(item => item.id)) + 1
        : 1

    const novoUso = {
        id: novoId,
        sistema: req.body.sistema,
        tipo: req.body.tipo,
        finalidade: req.body.finalidade,
        tecnologia: req.body.tecnologia,
        nivel_risco: req.body.nivel_risco,
        possui_revisao_humana: req.body.possui_revisao_humana
    }

    dados.push(novoUso)
    salvarDados(dados)

    res.status(201).json(novoUso)
})

// PUT - atualizar uso
app.put('/usos/:id', (req, res) => {
    const dados = lerDados()
    const id = Number(req.params.id)

    const indice = dados.findIndex(item => item.id === id)

    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Uso de IA não encontrado'
        })
    }

    dados[indice] = {
        id: id,
        sistema: req.body.sistema,
        tipo: req.body.tipo,
        finalidade: req.body.finalidade,
        tecnologia: req.body.tecnologia,
        nivel_risco: req.body.nivel_risco,
        possui_revisao_humana: req.body.possui_revisao_humana
    }

    salvarDados(dados)

    res.json(dados[indice])
})

// DELETE - excluir uso
app.delete('/usos/:id', (req, res) => {
    const dados = lerDados()
    const id = Number(req.params.id)

    const indice = dados.findIndex(item => item.id === id)

    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Uso de IA não encontrado'
        })
    }

    const removido = dados.splice(indice, 1)[0]

    salvarDados(dados)

    res.json({
        mensagem: 'Uso de IA excluído com sucesso',
        uso: removido
    })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})