//Dados
const proffys = [
    {
        name: "Diego Fernandes",
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "999763184",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },

    {
        name: "Daniele Evangelista",
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "999763184",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects =[
    
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia"                                    ,
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

//Funcionalidades
//o render é uma função pertecente ao nunjucks

function getSubject(subjectNumber){
    arrayPosition = +subjectNumber - 1 //+ transforma em inteiro
    return subjects[arrayPosition]
}

function pageLanding(req,res){
    return res.render("index.html")
}

function pageStudy(req,res){
    const filters = req.query //recebe as informações enviadas pelo butão filtro da pagina study
    return res.render("study.html", {proffys, filters,subjects, weekdays})
}

function pageGiveClasses(req,res){
    const data = req.query
    
    

    //adicionar dados a lista de proffys
    
    const isNotEmpty = Object.keys(data).length > 0

    if (isNotEmpty){

        data.subject = getSubject(data.subject)

        proffys.push(data)

        return res.redirect("/study")
    } 

    
    
    return res.render("give-classes.html",{subjects,weekdays})
}

//importações
const express = require('express')
const server = express()

//configyrar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{
    express: server,
    noCache: true,
})

server
//configurar arquivos estáticos(css,scripts,imagens)
.use(express.static("public"))
//rotas de aplicação
.get("/", pageLanding)    
.get("/study",pageStudy)
.get("/give-classes",pageGiveClasses)

.listen(5500)

//todos os gets são as configurações das rotas
//o .listen(5500) é a porta que estamos usando no nosso servidor
//express é a biblioteca que usamos para subir o servidor



  