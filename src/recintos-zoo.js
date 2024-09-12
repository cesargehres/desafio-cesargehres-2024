class Animal {

    constructor (especie, tamanho, listaBiomas, carnivoro) {
        this._especie = especie.toUpperCase()
        this._tamanho = tamanho
        this._listaBiomas = listaBiomas
        this._carnivoro = carnivoro


    }

    //Retorna a especie do animal
    get especie() {
        return this._especie
    }

    //Retorna o tamanho que o animal ocupa
    get tamanho() {
        return this._tamanho
    }

    //Retorna true se o animal esta confortavel
    get confortavel() {
        return this._confortavel
    }

    //Retorna true se o animal é carnivoro
    get carnivoro() {
        return this._carnivoro
    }

    //Retorna a lista com os biomas do animal
    get biomas() {
        return this._listaBiomas
    }

}


class Recinto {

    constructor (id, listaBiomas, tamanhoTotal) {
        this._id = id,
        this._biomas = listaBiomas
        this._tamanhoTotal = tamanhoTotal
        this._animaisExistentes = []
    }

    //Retorna o id do recinto
    get id() {
        return this._id
    }

    //Retorna o bioma
    get biomas() {
        return this._biomas
    }

    //Retorna o tamanho total do recinto
    get tamanhoTotal() {
        return this._tamanhoTotal
    }

    //Retorna os os animais existentes no recinto
    get animaisExistentes() {
        return this._animaisExistentes
    }

    //Retorna o espaço livre do recinto
    espacoLivre() {
        let espacoLivre = this.tamanhoTotal
        for (let c = 0; c < this._animaisExistentes.length; c++) {
            let quantAnimal = this.animaisExistentes[c][1]
            let animalOcupa = this.animaisExistentes[c][0].tamanho * quantAnimal
            espacoLivre -= animalOcupa
        }
        
        return espacoLivre
    }

    //Retorna o espaco livre que tera no recinto de acordo com o animal testado
    espacoLivreRestante(animal, quantidade) {

        let espacoLivreRestante = this.espacoLivre() - (animal.tamanho * quantidade)

        //Verifica se o recinto esta vazio
        if (this.verificaEspecies().length > 0 ) {
            
            //Verifica se ja existe animal da mesma especie no recinto
            if(this.verificaEspecies().includes(animal.especie)) {
                return espacoLivreRestante
            
            //Se nao tiver animal da mesma especie reduz em um o espaco livre que sobrará
            } else {
                return espacoLivreRestante - 1
            } 

        //Se o recinto estiver vazio
        } else {
            return espacoLivreRestante

        }

    }

    //Verifica a especie dos animais existentes
    verificaEspecies() {
        let listaAnimais = []
        let especie
        for (let c = 0; c < this._animaisExistentes.length; c++) {
            especie = this.animaisExistentes[c][0].especie
            listaAnimais.push(especie)
        }
        return listaAnimais
        
    }

    //Adiciona animais ao recinto
    adcAnimais(animal, quantidade) {
        let especiesExistentes = this.verificaEspecies()

        //Verifica se a quantidade de animais é menor que 1
        if (quantidade < 1) {
            console.log('Erro! A quantidade de animais não pode ser menor que 1')

        //Verifica se há animais no recinto
        } else if (especiesExistentes.length === 0 || especiesExistentes.includes(animal.especie) === false) {
            this._animaisExistentes.push([animal, quantidade])

        } else {

            for (let c = 0; c < especiesExistentes.length; c++) {

                //Verifica o indice do animal para modificar sua quantidade
                if (animal.especie === especiesExistentes[c]) {
                    this._animaisExistentes[c][1] += quantidade

                }
            }

        }
    }

}

    


class RecintosZoo {

    constructor () {
        this._recintos = [recinto1, recinto2, recinto3, recinto4, recinto5]
    }

    //Retorna uma lista dos recintos com os biomas adequados
    recintosAdeBioma(animal) {
        const recintos = this._recintos
        
        const recintosAdequados = recintos.filter((recinto) => {
            if (animal.biomas.some(animalBioma => recinto.biomas.includes(animalBioma))) {
                return recinto
            }
        })
        
        return recintosAdequados
        
    }

    //Retorna uma lista dos recintos com espaço suficiente
    recintosAdeEspaco(animal, quantidade) {
        const recintos = this._recintos
        const espacoNecessitado = animal.tamanho * quantidade

        const recintosAdequados = recintos.filter((recinto) => {
            //Verifica os recintos com espaço livre
            if (recinto.espacoLivre() >= espacoNecessitado) {
                let especies = recinto.verificaEspecies()

                //Verifica se tem animais no recinto
                if(especies.length === 0) {
                    return recinto


                } else {

                    //Verifica se ja existe animal da mesma especie no recinto
                    if (especies.includes(animal.especie)) {
                        return recinto
                    
                    } else {
                        //Verifica se sobrará um espaço a mais por haver animais diferentes no recinto
                        if (recinto.espacoLivre() - 1 >= espacoNecessitado) {
                            return recinto
                            
                        }

                    }

                }
        
            }
        })

        return recintosAdequados

    }

    //Retorna uma lista dos recintos adequados de acordo com a alimentação
    recintosAdeAlimentacao(animal) {
        const recintos = this._recintos

        const recintosAdequados = recintos.filter((recinto) => {
            //Se o animal for carnívoro
            if (animal.carnivoro) {

                //Verifica se o recinto esta vazio
                if (recinto.verificaEspecies().length === 0) {
                    return recinto

                } else {
                    //Verifica se a especie que tem no recinto é a mesma do animal
                    if (animal.especie === recinto.verificaEspecies()[0]) {
                        return recinto
                    }
                    
                }

            //Se o animal não for carnívoro
            } else {

                //Verifica se há animais carnívoros no recinto
                const animaisCarnivoros = recinto.animaisExistentes.filter((recintoAnimal) => {

                    if (recintoAnimal[0].carnivoro) {
                        return recintoAnimal

                    }
                })

                if (animaisCarnivoros.length === 0) {
                    return recinto

                }

            }
        })

        return recintosAdequados

    }

    //Formata a saída de acordo com o que foi pedido no desafio
    recintosViaveisFormatado(listaRecinto, animal, quantidade) {
        const recintosViaveisFormatados = []

        for (let c = 0; c < listaRecinto.length; c++) {
            recintosViaveisFormatados.push(`Recinto ${listaRecinto[c].id} (espaço livre: ${listaRecinto[c].espacoLivreRestante(animal, quantidade)} total: ${listaRecinto[c].tamanhoTotal})`)       
        }

        return recintosViaveisFormatados
    }


    analisaRecintos(animal, quantidade) {
        animal = animal.toUpperCase()
        const animaisValidos = [leao, leopardo, crocodilo, macaco, gazela, hipopotamo]
        
        //Pega o animal correspondente de 'animaisValidos'
        const animalValido = animaisValidos.find((animalValido) => animalValido.especie === animal.toUpperCase())
        
        //Verifica se o animal é válido
        if (animalValido === undefined) {
            return {erro: 'Animal inválido'}
        
        //Verifica se a quantidade é válida
        } else if (quantidade < 1) {
            return {erro: 'Quantidade inválida'}
        
        //Se as informações estiverem certas
        } else {
            const recintosAdeAlimentacao = this.recintosAdeAlimentacao(animalValido)
            const recintosAdeBioma = this.recintosAdeBioma(animalValido)
            const recintosAdeEspaco = this.recintosAdeEspaco(animalValido, quantidade)


            let hipopotamoNoRecinto
            let biomaSavanaRio
            //Verifica os recintos adequados
            let recintosAdequados = recintosAdeAlimentacao.filter((recinto) => {

                if (recintosAdeBioma.includes(recinto) && recintosAdeEspaco.includes(recinto)) {
                    return recinto
                }
            })

            //Caso o animal seja um macaco ele nao poderá ficar sozinho
            
            recintosAdequados = recintosAdequados.filter((recinto) => {

                hipopotamoNoRecinto = recinto.verificaEspecies().includes('HIPOPOTAMO') //Verifica se há hipopotamo no recinto
                biomaSavanaRio = recinto.biomas.includes('savana') && recinto.biomas.includes('rio') //Verifica se o bioma é Savana e Rio
                
                //Verifica se o animal é um macaco
                if (animal === 'MACACO') {

                    //Se a quantidade de macacos for 1 ele nao pode ir para um recinto fazio
                    if ((recinto.animaisExistentes.length === 0 && quantidade === 1) == false) {
                           return recinto
                    }
    
                //Verifica se o animal é um hipopotamo
                } else if (animal === 'HIPOPOTAMO') {

                    //Retornar recinto caso não tenha outras especies no recinto
                    if (recinto.animaisExistentes.length === 0 || hipopotamoNoRecinto) {
                        return recinto
                            
                    //Retornar o recinto caso o recinto tenha bioma savana e rio
                    } else if (biomaSavanaRio) {
                        return recinto
                    }
                    
                } else {
                    
                    //Verifica se há hipopotamo no recinto
                    if (hipopotamoNoRecinto === true) {
                        
                        // Retorna o recinto se o animal for hipopotamo ou o bioma seja savana e rio
                        if(animal === 'HIPOPOTAMO' || biomaSavanaRio) {
                            return recinto

                        }
    
                    // Se nao tiver hipopotamo
                    } else {
                        return recinto

                    }
                }

            })
            
            if (recintosAdequados.length > 0) {
                recintosAdequados = this.recintosViaveisFormatado(recintosAdequados, animalValido, quantidade)
                return {recintosViaveis: recintosAdequados}

            } else {
                return {erro: 'Não há recinto viável'}
            }
        }
    
    }

}



export { RecintosZoo as RecintosZoo };


//Cirando os animais
const leao = new Animal('leao', 3, ['savana'], true)
const leopardo = new Animal('leopardo', 2, ['savana'], true)
const crocodilo = new Animal('crocodilo', 3, ['rio'], true)
const macaco = new Animal('macaco', 1, ['savana', 'floresta'], false)
const gazela = new Animal('gazela', 2, ['savana'], false)
const hipopotamo = new Animal('hipopotamo', 4, ['savana', 'rio'], false)

//Criando os recintos
const recinto1 = new Recinto(1, ['savana'], 10)
const recinto2 = new Recinto(2, ['floresta'], 5)
const recinto3 = new Recinto(3, ['savana', 'rio'], 7)
const recinto4 = new Recinto(4, ['rio'], 8)
const recinto5 = new Recinto(5, ['savana'], 9)

//Adicionando os animais aos recintos
recinto1.adcAnimais(macaco, 3)
recinto3.adcAnimais(gazela, 1)
recinto5.adcAnimais(leao, 1)

